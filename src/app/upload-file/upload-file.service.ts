import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();

    files.forEach(file => formData.append('file', file, file.name));

    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    // return this.http.post(url, formData);
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress   // content-lenght -> tem que habilitar no back para que o Angular calcule o progresso
    })
  }

  handleFile(response: any, fileName: string) {
    const file = new Blob([response], {
      type: response.type,
    });

    // IE
    // if (window.navigator && window.navigator.msSaveOrOpenBlob(null)) {
    //   window.navigator.msSaveOrOpenBlob(file);
    //   return;
    // }

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // Chrome:
    // link.click();
    // Firefox:
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    // Chrome:
    // window.URL.revokeObjectURL(blob);
    // link.remove();
    // Firefox:
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }

}


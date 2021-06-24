import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { UploadFileService } from './../upload-file.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    // const selectedFiles = <FileList>event.srcElement.files;
    const selectedFiles = <FileList>event.target.files;
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    this.progress = 0;
  }

  // onUpload() {
  //   if (this.files && this.files.size > 0) {
  //     // this.service.upload(this.files, 'http://localhost:8000/upload')
  //     // this.service.upload(this.files, `${environment.BASE_URL}/upload`)  // usando proxy do Angular.
  //     //   .subscribe(response => console.log('Upload concluído.'));
  //     this.service
  //       .upload(this.files, `${environment.BASE_URL}/upload`)
  //       .subscribe((event: HttpEvent<Object>) => {
  //         // HttpEventType
  //         console.log(event);
  //         if (event.type === HttpEventType.Response) {
  //           console.log('Upload concluído.');
  //         } else if(event.type === HttpEventType.UploadProgress) {
  //           const percent = event.total ? Math.round((event.loaded * 100) / event.total) : 0;
  //           console.log('Progresso: ', percent);
  //           this.progress = percent;
  //         }
  //       });
  //   }
  // }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            // console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload concluído.'));
    }
  }

}

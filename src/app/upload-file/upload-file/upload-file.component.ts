import { Component, OnInit } from '@angular/core';

import { UploadFileService } from './../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    // const selectedFiles = <FileList>event.srcElement.files;
    const selectedFiles = <FileList>event.target.files;
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
        .subscribe(response => console.log('Upload concluído.'));
    }
  }
}

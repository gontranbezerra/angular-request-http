import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    // const selectedFiles = <FileList>event.srcElement.files;
    const selectedFiles = <FileList>event.target.files;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: ['./poc-base.component.scss'],
})
export class PocBaseComponent implements OnInit {
  @Input() nome!: string;
  @Input() valor!: string | null;
  @Input() estilo!: string;

  constructor() {}

  ngOnInit(): void {}
}

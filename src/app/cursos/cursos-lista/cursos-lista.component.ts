import { Component, OnDestroy, OnInit } from '@angular/core';

import { CursosService } from './../cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit, OnDestroy {

  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>;

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados);

    // this.cursos$ = this.service.list();
    // this.cursos$.subscribe((dados) => (this.cursos = dados));

    this.cursos$ = this.service.list();
  }

  ngOnDestroy() {

  }



}

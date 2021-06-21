import { Component, OnDestroy, OnInit } from '@angular/core';

import { CursosService } from './../cursos.service';
import { Curso } from '../curso';
import { empty, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit, OnDestroy {

  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados);

    // this.cursos$ = this.service.list();
    // this.cursos$.subscribe((dados) => (this.cursos = dados));

    // this.cursos$ = this.service.list();

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        // return empty();
        return of<Curso[]>(); // também retorna um Observable vazio como empty().
      })
    );

    // Outras possibilidades:

    // this.service.list().subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.error(error),
    //   () => console.log('Observable completo.')
    // )

    // ou...

    // this.service.list()
    // .pipe(
    //   catchError(error => empty()) // catchError() tem que ser o último operador do Pipe()
    // )
    // .subscribe(
    //   (dados) => console.log(dados)
    // );
  }

  ngOnDestroy() {

  }



}

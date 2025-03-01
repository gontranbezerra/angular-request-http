import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>
  `,
})
export class PocAsyncComponent implements OnInit, OnDestroy {
  nome = 'Componente com async';
  valor$!: Observable<string> | null;

  constructor(private service: EnviarValorService) {}

  ngOnInit(): void {
    this.valor$ = this.service
      .getValor()
      .pipe(tap((v) => console.log(this.nome, v)));
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruído.`);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { Curso } from '../curso';
import { CursosService } from './../cursos.service';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component({
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit, OnDestroy {
  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  // bsModalRef!: BsModalRef;

  constructor(
    private service: CursosService,
    // private modalService: BsModalService
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados);

    // this.cursos$ = this.service.list();
    // this.cursos$.subscribe((dados) => (this.cursos = dados));

    // this.cursos$ = this.service.list();

    this.onRefresh();
  }

  onRefresh() {
    // this.cursos$ = this.service.list().pipe(
    //   catchError((error) => {
    //     console.error(error);
    //     this.error$.next(true);
    //     // return empty();
    //     return of<Curso[]>(); // também retorna um Observable vazio como empty().
    //   })
    // );

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

    // Mostar erro com Modal
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        this.handleerror();
        return of<Curso[]>(); // também retorna um Observable vazio como empty().
      })
    );
  }

  handleerror() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos.';

    this.alertService.showAlertDanger('Erro ao carregar cursos.');
  }

  onEdit(id: number | null) {
    id && this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(cruso: Curso) {

  }

  ngOnDestroy() {}
}

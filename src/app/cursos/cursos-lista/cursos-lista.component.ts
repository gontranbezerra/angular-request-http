import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of, pipe, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
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
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  // bsModalRef!: BsModalRef;
  deleteModalRef!: BsModalRef;
  cursoSelecionado!: Curso;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;

    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });

    // this.alertService.showConfirm(
    //   'Confirmação',
    //   'Tem certeza que deseja remover esse curso?'
    // );

    const resultSubject = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse curso?'
    );

    const result$ = resultSubject.asObservable(); // transforma o Subject em Observable

    result$
      .pipe(
        take(1),
        switchMap(
          (result) => (result ? this.service.remove(<number>curso.id) : EMPTY) // ou  `...: of()` | ou `...: of<Curso[]>()`
        )
      )
      .subscribe( // o subscript só é executado de result for true, se for EMPTY não será executado
        (success) => this.onRefresh(),
        (error) => this.alertService.showAlertDanger('Error ao remover curso.')
      );

  }

  // onDelete(template: TemplateRef<any>) {
  //   this.deleteModalRef = this.modalService.show(template, {
  //     class: 'modal-sm',
  //   });
  // }

  onConfirmDelete(): void {
    // this.message = 'Confirmed!';
    this.service.remove(<number>this.cursoSelecionado.id).subscribe(
      (success) => this.onRefresh(),
      (error) => this.alertService.showAlertDanger('Error ao remover curso.')
    );
    this.deleteModalRef.hide();
  }

  onDeclineDelete(): void {
    // this.message = 'Declined!';
    this.deleteModalRef.hide();
  }

  ngOnDestroy() {}
}

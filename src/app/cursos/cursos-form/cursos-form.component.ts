import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Curso } from '../curso';
import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   const { id } = params;
    //   const curso$ = this.service.loadByID(id);
    //   curso$.subscribe(curso => {
    //     this.updateForm(<Curso>curso);
    //   })
    // });
    // refatorando...
    this.route.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id: number) => this.service.loadByID(id))
      )
      .subscribe((curso) => this.updateForm(<Curso>curso)); // ATENÇÃO: nesse caso de subscribe em rota o próprio Angula faz o unsubscribe quando muda a rota.
    // pesquise sobre operadores para uso em CRUD:
    //    concatMap -> ordem da rquisição importa
    //    mergeMap -> ordem da requição não importa (mais utilziado)
    //    exaustMap -> só vai para a próxima chamada após recebe resposta. Muito comum em caso de Login.

    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso: Curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        // como o serviço já tem o take não precisa desincrever.
        // success => console.log('success'),
        (success) => {
          this.modal.showAlertSuccess('Cruso criado.')
          this.location.back();
        },
        // error => console.error(error),
        (error) => this.modal.showAlertDanger('Error ao criar curso.'),
        () => console.log('request OK')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}

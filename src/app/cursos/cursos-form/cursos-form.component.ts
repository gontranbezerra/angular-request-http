import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
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
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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

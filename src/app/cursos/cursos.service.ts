import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';

import { Curso } from './curso';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}/cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadByID(id: number) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: Curso) {
    return this.http.post(this.API, curso)
      .pipe(
        take(1) // o take já fará a desincrição do Observable.
      )
  }

}

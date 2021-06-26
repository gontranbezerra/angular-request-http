import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSearch() {
    let search = this.queryField.value;
    if (search && (search = search.trim()) !== '') {

      // const params = {
      //   search,
      //   fields: this.FIELDS,
      // }

      let params = new HttpParams();
      params = params.set('search', search);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http
        // .get(`${this.SEARCH_URL}?fields=${this.FIELDS}&search=${search}`)
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((response: any) => (this.total = response.total)),
          map((response: any) => response.results)
        );
    }
  }
}
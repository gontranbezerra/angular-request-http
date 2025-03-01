import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';


@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveSearchRoutingModule
  ]
})
export class ReactiveSearchModule { }

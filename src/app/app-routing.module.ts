import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'cursos', loadChildren: './cursos/cursos.module#CursosModule' },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'rxjs-poc',
    loadChildren: () =>
      import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(
        (m) => m.UnsubscribeRxjsModule
      ),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload-file/upload-file.module').then(
        (m) => m.UploadFileModule
      ),
    data: { preload: true },
  },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: '**', redirectTo: '/upload' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

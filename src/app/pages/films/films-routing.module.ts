import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmDetailComponent } from './film-detail/film-detail.component';

import { FilmsComponent } from './films.component';

const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: ':action', component: FilmDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }

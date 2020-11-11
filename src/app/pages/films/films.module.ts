import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FilmsComponent, FilmDetailComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    SharedModule
  ]
})
export class FilmsModule { }

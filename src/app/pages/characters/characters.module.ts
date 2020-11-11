import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CharactersComponent, CharacterDetailComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule
  ]
})
export class CharactersModule { }

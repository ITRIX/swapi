import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

import { CharactersComponent } from './characters.component';

const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: ':action', component: CharacterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }

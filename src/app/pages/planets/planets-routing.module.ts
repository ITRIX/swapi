import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

import { PlanetsComponent } from './planets.component';

const routes: Routes = [
  { path: '', component: PlanetsComponent },
  { path: ':action', component: PlanetDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsRoutingModule { }

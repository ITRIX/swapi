import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PlanetsComponent, PlanetDetailComponent],
  imports: [
    CommonModule,
    PlanetsRoutingModule,
    SharedModule
  ]
})
export class PlanetsModule { }

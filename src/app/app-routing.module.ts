import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'films', loadChildren: () => import('./pages/films/films.module').then(m => m.FilmsModule) },
      { path: 'characters', loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule) },
      { path: 'planets', loadChildren: () => import('./pages/planets/planets.module').then(m => m.PlanetsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  }, {
    path: 'event',
    loadComponent: () => import('./event/event.component').then(m => m.EventComponent)
  }, {
    path: 'race',
    loadComponent: () => import('./race/race.component').then(m => m.RaceComponent)
  }, {
    path: 'logger',
    loadComponent: () => import('./logger/logger.component').then(m => m.LoggerComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullMainRoutingModule { }

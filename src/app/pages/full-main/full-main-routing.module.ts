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
    path: 'season',
    loadComponent: () => import('./season/season.component').then(m => m.SeasonComponent)
  }, {
    path: 'event',
    loadComponent: () => import('./event/event.component').then(m => m.EventComponent)
  }, {
    path: 'race',
    loadComponent: () => import('./race/race.component').then(m => m.RaceComponent)
  }, {
    path: 'logger',
    loadComponent: () => import('./logger/logger.component').then(m => m.LoggerComponent)
  }, {
    path: 'logger/add-logger',
    loadComponent: () => import('./logger/add-logger/add-logger.component').then(m => m.AddLoggerComponent)
  }, {
    path: 'add-event',
    loadComponent: () => import('./add-event/add-event.component').then(m => m.AddEventComponent)
  }, {
    path: 'setting-logger',
    loadComponent: () => import('./setting-logger/setting-logger.component').then(m => m.SettingLoggerComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullMainRoutingModule { }

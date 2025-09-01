import { Routes } from '@angular/router';
import { FullMainComponent } from './pages/full-main/full-main.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    }, {
        path: 'pages',
        component: FullMainComponent,
        loadChildren: () => import('./pages/full-main/full-main-routing.module').then(m => m.FullMainRoutingModule)
    }
];

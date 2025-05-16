import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'gym-cerca',
    loadComponent: () => import('./gym-cerca/gym-cerca.page').then( m => m.GymCercaPage)
  },
  {
    path: 'ejercicios',
    loadComponent: () => import('./ejercicios/ejercicios.page').then( m => m.EjerciciosPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot/forgot.page').then( m => m.ForgotPage)
  },
  {
    path: 'index',
    loadComponent: () => import('./index/index.page').then( m => m.IndexPage)
  },

];

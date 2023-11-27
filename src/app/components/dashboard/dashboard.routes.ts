
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('../users/users.page').then( m => m.UsersPage)
  },
  {
    path: 'history',
    loadComponent: () => import('../history/history.page').then( m => m.HistoryPage)
  }
];

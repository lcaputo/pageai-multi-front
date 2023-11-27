import { Routes } from '@angular/router';
import { DashboardPage } from './components/dashboard/dashboard.page';
import { UsersPage } from './components/users/users.page';
import { HistoryPage } from './components/history/history.page';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/User.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    // layout
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
      },
    ],
    canActivate: [
      AdminGuard
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'posts',
    loadComponent: () => import('./components/posts/posts.page').then( m => m.PostsPage),
    canActivate: [
      UserGuard
    ],
  }
];

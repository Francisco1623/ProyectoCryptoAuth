import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuardGuard } from './auth/guard/auth-guard-guard';
import { authUserGuard } from './auth/guard/auth-user-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home},
    { path: 'missions', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions),canActivate:[authUserGuard] },
    { path: 'mission/:id', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions),canActivate:[authUserGuard] },
    { path: 'add-mission', loadComponent: () => import('./pages/new-mission/new-mission').then(m => m.NewMission),canActivate:[authGuardGuard("ADMIN")] },
    { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) }
    /*
    Cosas por hacer
    { path: 'users', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions),canActivate:[authGuardGuard("ADMIN")] },
    { path: 'add-user', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions),canActivate:[authGuardGuard("ADMIN")] },
    { path: 'aspirantes/:id', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions),canActivate:[authGuardGuard("ADMIN")] },
*/

];

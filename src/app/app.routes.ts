import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
            { path: 'alumnos', loadComponent: () => import('./alumnos/lista-alumnos/lista-alumnos.component').then(m => m.ListaAlumnosComponent), canActivate: [authGuard] },
            { path: 'cursos', loadComponent: () => import('./cursos/lista-cursos/lista-cursos.component').then(m => m.CursosComponent), canActivate: [authGuard] },
            { path: 'clases', loadComponent: () => import('./clases/lista-clases/lista-clases.component').then(m => m.ListaClasesComponent), canActivate: [authGuard] },
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];


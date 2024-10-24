import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { CursosComponent } from './cursos/cursos.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
            { path: 'alumnos', component: ListaAlumnosComponent },
            { path: 'inscripciones', component: InscripcionesComponent },
            { path: 'cursos', component: CursosComponent },
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    { path: '**', redirectTo: '' },

];

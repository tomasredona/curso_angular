import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './alumnos/abm-alumnos/abm-alumnos.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListaAlumnosComponent, AbmAlumnosComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyect';
}

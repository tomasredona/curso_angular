import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListaAlumnosComponent, AbmAlumnosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyect';
}

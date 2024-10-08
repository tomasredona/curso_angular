import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alumno } from '../interfaces/alumno.interface';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, AbmAlumnosComponent, MatIconModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'carrera', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  abmAlumno(alumno: Alumno) {
    alumno.id = Math.floor(Math.random() * 1000)
    const newAlumnos = this.dataSource.data
    newAlumnos.push(alumno)
    this.dataSource.data = [...newAlumnos]
    console.log('hola', this.dataSource.data)
  }
  borrarAlumno(id: number) {
    this.dataSource.data = this.dataSource.data.filter(alumno => alumno.id != id)
  }

}

let ELEMENT_DATA: Alumno[] = [
  { id: 1, nombre: "Carlos", apellido: "Garcia", carrera: "Derecho" },
  { id: 2, nombre: "Juan", apellido: "Lopez", carrera: "Psicología" }
];





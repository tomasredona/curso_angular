import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alumno } from '../interfaces/alumno.interface';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'carrera', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  crearAlumno() {

    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((nuevoAlumno: Alumno) => {
      if (nuevoAlumno) {
        this.dataSource.data.push(nuevoAlumno);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  editarAlumno(alumno: Alumno) {

    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      height: '400px',
      width: '600px',
      data: { alumno: alumno, editar: true }
    });

    dialogRef.afterClosed().subscribe((editarAlumno: Alumno) => {
      if (editarAlumno) {
        this.dataSource.data = this.dataSource.data.filter(alumno => alumno.id !== editarAlumno.id);
        this.dataSource.data.push(editarAlumno);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  borrarAlumno(id: number) {
    this.dataSource.data = this.dataSource.data.filter(alumno => alumno.id !== id);
    this.dataSource._updateChangeSubscription();
  }
}

let ELEMENT_DATA: Alumno[] = [
  { id: 1, nombre: "Carlos", apellido: "Garcia", carrera: "Derecho" },
  { id: 2, nombre: "Juan", apellido: "Lopez", carrera: "Psicología" }
];

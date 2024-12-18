import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipePipe } from '../../utilities/pipes/full-name-pipe';
import { TitleCasePipe } from '@angular/common';
import { AlumnosService } from '../../core/services/alumnos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, FullNamePipePipe, TitleCasePipe, MatButtonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'curso', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private alumnosService: AlumnosService) { }

  ngAfterViewInit() {
    this.obtenerAlumnos()
  }

  obtenerAlumnos() {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos: Alumno[]) => {
      this.dataSource.data = alumnos;
      this.dataSource.paginator = this.paginator;
    });
  }

  crearAlumno() {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((nuevoAlumno: Alumno) => {
      if (nuevoAlumno) {
        this.alumnosService.agregarAlumno(nuevoAlumno).subscribe(nuevoAlumno => this.obtenerAlumnos())
      }
    });
  }

  editarAlumno(alumno: Alumno, puedeEditar: boolean) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      height: '300px',
      width: '600px',
      data: { alumno: alumno, editar: true, puedeEditar: puedeEditar }
    });

    dialogRef.afterClosed().subscribe((alumnoEditado: Alumno) => {
      if (alumnoEditado) {
        this.alumnosService.editarAlumno(alumnoEditado).subscribe(alumnoEditado => this.obtenerAlumnos());
      }
    });
  }

  borrarAlumno(id: number) {
    this.alumnosService.eliminarAlumno(id).subscribe(alumnoEliminado => this.obtenerAlumnos());
  }

}
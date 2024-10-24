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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FullNamePipePipe,
    TitleCasePipe
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'carrera', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>();
  alumnosSubscription!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private alumnosService: AlumnosService) { }

  ngAfterViewInit() {

    // suscripcion al servicio para obtener los alumnos
    this.alumnosSubscription = this.alumnosService.obtenerAlumnos().subscribe(alumnos => {
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
        this.alumnosService.agregarAlumno(nuevoAlumno);
      }
    });
  }

  editarAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      height: '300px',
      width: '600px',
      data: { alumno: alumno, editar: true }
    });

    dialogRef.afterClosed().subscribe((alumnoEditado: Alumno) => {
      if (alumnoEditado) {
        this.alumnosService.editarAlumno(alumnoEditado);
      }
    });
  }

  borrarAlumno(id: number) {
    this.alumnosService.eliminarAlumno(id);
  }

  ngOnDestroy() {
    if (this.alumnosSubscription) {
      this.alumnosSubscription.unsubscribe();
    }
  }
}

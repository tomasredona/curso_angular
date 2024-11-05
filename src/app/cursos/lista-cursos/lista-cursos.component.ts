import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../utilities/interfaces/curso.interface';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from '../abm-cursos/abm-cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { CursosService } from '../../core/services/cursos.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, TitleCasePipe, MatButtonModule],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.css'
})
export class CursosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'anio', 'acciones'];
  dataSource = new MatTableDataSource<Curso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private cursosService: CursosService) { }

  ngAfterViewInit() {
    this.obtenerCursos()
  }

  obtenerCursos() {
    this.cursosService.obtenerCursos().subscribe((cursos: Curso[]) => {
      this.dataSource.data = cursos;
      this.dataSource.paginator = this.paginator;
    });
  }

  crearCurso() {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((nuevoCurso: Curso) => {
      if (nuevoCurso) {
        this.cursosService.agregarCurso(nuevoCurso).subscribe(nuevoCurso => this.obtenerCursos());
      }
    });
  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      height: '300px',
      width: '600px',
      data: { curso: curso, editar: true }
    });

    dialogRef.afterClosed().subscribe((cursoEditado: Curso) => {
      if (cursoEditado) {
        this.cursosService.editarCurso(cursoEditado).subscribe(cursoEditado => this.obtenerCursos());
      }
    });
  }

  borrarCurso(id: number) {
    this.cursosService.eliminarCurso(id).subscribe(borrarCurso => this.obtenerCursos());
  }

}



import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Clase } from '../../utilities/interfaces/clase.interface';
import { MatDialog } from '@angular/material/dialog';
import { AbmClasesComponent } from '../abm-clases/abm-clases.component';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { ClasesService } from '../../core/services/clases.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-clases',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, TitleCasePipe, MatButtonModule
  ],
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.css']
})
export class ListaClasesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'dificultad', 'acciones'];
  dataSource = new MatTableDataSource<Clase>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private clasesService: ClasesService) { }

  ngAfterViewInit() {
    this.obtenerClases()
  }
  obtenerClases() {
    this.clasesService.obtenerClases().subscribe(clases => {
      this.dataSource.data = clases;
      this.dataSource.paginator = this.paginator;
    });
  }


  crearClase() {
    const dialogRef = this.dialog.open(AbmClasesComponent, {
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((nuevoClase: Clase) => {
      if (nuevoClase) {
        this.clasesService.agregarClase(nuevoClase);
      }
    });
  }

  editarClase(clase: Clase) {
    const dialogRef = this.dialog.open(AbmClasesComponent, {
      height: '300px',
      width: '600px',
      data: { clase: clase, editar: true }
    });

    dialogRef.afterClosed().subscribe((claseEditado: Clase) => {
      if (claseEditado) {
        this.clasesService.editarClase(claseEditado);
      }
    });
  }

  borrarClase(id: number) {
    this.clasesService.eliminarClase(id);
  }

}



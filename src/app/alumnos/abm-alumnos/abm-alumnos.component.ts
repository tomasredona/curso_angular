import { Component, Inject, OnInit, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../utilities/interfaces/curso.interface';
import { CursosService } from '../../core/services/cursos.service';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatOption, MatSelectModule],
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {
  alumnoForm: FormGroup;
  listaCursos: Curso[] = []

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    private cursosservices: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alumnoForm = this.formBuilder.group({
      nombre: [{ value: data ? data.alumno.nombre : '', disabled: data.puedeEditar == false }, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      apellido: [{ value: data ? data.alumno.apellido : '', disabled: data.puedeEditar == false }, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      curso: [{ value: data ? data.alumno.curso : [], disabled: data.puedeEditar == false }, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cursosservices.obtenerCursos().subscribe(cursos => this.listaCursos = cursos)
    console.log(this.data.alumno.curso)
  }

  onSubmit() {
    if (this.alumnoForm.valid) {
      let nuevoAlumno: Alumno

      if (this.data?.editar) {
        nuevoAlumno = {
          ...this.alumnoForm.value,
          id: this.data.alumno.id
        };
      } else {
        nuevoAlumno = {
          ...this.alumnoForm.value, /* nombre: this.alumnoForm.value.nombre y así con los otros dos */
          id: Math.floor(Math.random() * 50) + 1
        };
      }
      this.dialogRef.close(nuevoAlumno)
    }
  }

  compareCursos(curso1: any, curso2: any): boolean {
    return curso1 && curso2 ? curso1.id === curso2.id : curso1 === curso2;
  }
}

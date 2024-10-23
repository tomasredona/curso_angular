import { Component, Inject, OnInit, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {
  alumnoForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alumnoForm = this.formBuilder.group({
      nombre: [data ? data.alumno.nombre : '', [Validators.required]],
      apellido: [data ? data.alumno.apellido : '', [Validators.required]],
      carrera: [data ? data.alumno.carrera : '', [Validators.required]]
    });
  }

  ngOnInit(): void {

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
}

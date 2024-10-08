import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Alumno } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './abm-alumnos.component.html',
  styleUrl: './abm-alumnos.component.css'
})
export class AbmAlumnosComponent {
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.alumnoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      carrera: ['', [Validators.required]]
    });
  }
  alumnoForm: FormGroup
  @Output() alumno = new EventEmitter<Alumno>();

  onSubmit(alumno: Alumno) {
    if (this.alumnoForm.valid) {
      this.alumno.emit(alumno)
      this.alumnoForm.reset()
      this.alumnoForm.setErrors(null)
    }
  }

}

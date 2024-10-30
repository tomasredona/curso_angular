import { Component, Inject, OnInit, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Curso } from '../../utilities/interfaces/curso.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-cursos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css']
})
export class AbmCursosComponent implements OnInit {
  cursoForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cursoForm = this.formBuilder.group({
      nombre: [data ? data.curso.nombre : '', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      anio: [data ? data.curso.anio : '', [Validators.required, Validators.pattern(/^[1-5]$/)
      ]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      let nuevoCurso: Curso

      if (this.data?.editar) {
        nuevoCurso = {
          ...this.cursoForm.value,
          id: this.data.curso.id
        };
      } else {
        nuevoCurso = {
          ...this.cursoForm.value, /* nombre: this.cursoForm.value.nombre y así con los otros dos */
          id: Math.floor(Math.random() * 50) + 1
        };
      }
      this.dialogRef.close(nuevoCurso)
    }
  }
}

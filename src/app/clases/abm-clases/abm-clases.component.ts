import { Component, Inject, OnInit, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Clase } from '../../utilities/interfaces/clase.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-Clases',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './abm-Clases.component.html',
  styleUrls: ['./abm-Clases.component.css']
})
export class AbmClasesComponent implements OnInit {
  claseForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AbmClasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.claseForm = this.formBuilder.group({
      nombre: [data ? data.clase.nombre : '', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      dificultad: [data ? data.clase.difucultad : '', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.claseForm.valid) {
      let nuevoClase: Clase

      if (this.data?.editar) {
        nuevoClase = {
          ...this.claseForm.value,
          id: this.data.clase.id
        };
      } else {
        nuevoClase = {
          ...this.claseForm.value, /* nombre: this.claseForm.value.nombre y así con los otros dos */
          id: Math.floor(Math.random() * 50) + 1
        };
      }
      this.dialogRef.close(nuevoClase)
    }
  }
}

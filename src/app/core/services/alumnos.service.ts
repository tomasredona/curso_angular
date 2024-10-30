import { Injectable } from '@angular/core';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlumnosService {
    private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([
        { id: 1, nombre: "Carlos", apellido: "Garcia", carrera: "Quimica" },
        { id: 2, nombre: "Juan", apellido: "Lopez", carrera: "Fisica" }
    ]);

    constructor() { }

    obtenerAlumnos(): Observable<Alumno[]> {
        return this.alumnosSubject.asObservable();
    }

    agregarAlumno(alumno: Alumno): void {
        const alumnosActuales = this.alumnosSubject.getValue();
        this.alumnosSubject.next([...alumnosActuales, alumno]);
    }

    editarAlumno(alumnoEditado: Alumno): void {
        const alumnosActuales = this.alumnosSubject.getValue().map(alumno =>
            alumno.id === alumnoEditado.id ? alumnoEditado : alumno
        );
        this.alumnosSubject.next(alumnosActuales);
    }

    eliminarAlumno(id: number): void {
        Swal.fire({
            title: "Desea confirmar esta acción?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                const alumnosActuales = this.alumnosSubject.getValue().filter(alumno => alumno.id !== id);
                this.alumnosSubject.next(alumnosActuales);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El alumno ha sido eliminado.",
                    icon: "success"
                });
            }
        });

    }
}


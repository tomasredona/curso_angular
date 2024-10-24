import { Injectable } from '@angular/core';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlumnosService {
    private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([
        { id: 1, nombre: "Carlos", apellido: "Garcia", carrera: "Derecho" },
        { id: 2, nombre: "Juan", apellido: "Lopez", carrera: "Psicología" }
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
        const alumnosActuales = this.alumnosSubject.getValue().filter(alumno => alumno.id !== id);
        this.alumnosSubject.next(alumnosActuales);
    }
}


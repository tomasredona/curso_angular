import { Injectable } from '@angular/core';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environments } from '../../environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AlumnosService {
    private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([
        { id: 1, nombre: "Carlos", apellido: "Garcia", carrera: "Quimica" },
        { id: 2, nombre: "Juan", apellido: "Lopez", carrera: "Fisica" }
    ]);

    private path = environments.path

    constructor(private http: HttpClient) { }

    obtenerAlumnos(): Observable<Alumno[]> {
        return this.http.get<Alumno[]>(`${this.path}/alumno`)
    }

    agregarAlumno(alumno: Alumno): Observable<Alumno> {
        return this.http.post<Alumno>(`${this.path}/alumno`, alumno)
    }

    editarAlumno(alumnoEditado: Alumno): Observable<Alumno> {
        return this.http.put<Alumno>(`${this.path}/alumno/${alumnoEditado.id}`, alumnoEditado)

    }

    eliminarAlumno(id: number): Observable<any> {
        return new Observable((observer) => {
            Swal.fire({
                title: "¿Desea confirmar esta acción?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.http.delete(`${this.path}/alumno/${id}`).subscribe({
                        next: (response) => {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El alumno ha sido eliminado.",
                                icon: "success"
                            });
                            observer.next(response);
                            observer.complete();
                        },
                        error: (error) => observer.error(error)
                    });
                } else {
                    observer.complete();
                }
            });
        });
    }
}


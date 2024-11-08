import { Injectable } from '@angular/core';
import { Curso } from '../../utilities/interfaces/curso.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { environments } from '../../environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CursosService {


    private path = environments.path

    constructor(private http: HttpClient) { }

    obtenerCursos(): Observable<Curso[]> {
        return this.http.get<Curso[]>(`${this.path}/cursos`)
    }

    obtenerUnCursos(id: number): Observable<Curso> {
        return this.http.get<Curso>(`${this.path}/cursos/${id}`)
    }

    agregarCurso(curso: Curso): Observable<Curso> {

        return this.http.post<Curso>(`${this.path}/cursos`, curso)
    }

    editarCurso(cursoEditado: Curso): Observable<Curso> {
        return this.http.put<Curso>(`${this.path}/cursos/${cursoEditado.id}`, cursoEditado)
    }

    eliminarCurso(id: number): Observable<any> {
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
                    this.http.delete(`${this.path}/cursos/${id}`).subscribe({
                        next: (response) => {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El curso ha sido eliminado.",
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


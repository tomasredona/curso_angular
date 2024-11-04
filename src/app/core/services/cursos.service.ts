import { Injectable } from '@angular/core';
import { Curso } from '../../utilities/interfaces/curso.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    private cursosSubject: BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>([
        { id: 1, nombre: "desarrollo web", anio: 1 },
        { id: 2, nombre: "marketing", anio: 3 }
    ]);

    constructor() { }

    obtenerCursos(): Observable<Curso[]> {
        return this.cursosSubject.asObservable();
    }

    agregarCurso(curso: Curso): void {
        const cursosActuales = this.cursosSubject.getValue();
        this.cursosSubject.next([...cursosActuales, curso]);
    }

    editarCurso(cursoEditado: Curso): void {
        const cursosActuales = this.cursosSubject.getValue().map(curso =>
            curso.id === cursoEditado.id ? cursoEditado : curso
        );
        this.cursosSubject.next(cursosActuales);
    }

    eliminarCurso(id: number): void {
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
                const cursosActuales = this.cursosSubject.getValue().filter(curso => curso.id !== id);
                this.cursosSubject.next(cursosActuales);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El curso ha sido eliminado.",
                    icon: "success"
                });
            }
        });

    }
}


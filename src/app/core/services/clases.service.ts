import { Injectable } from '@angular/core';
import { Clase } from '../../utilities/interfaces/clase.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ClasesService {
    private clasesSubject: BehaviorSubject<Clase[]> = new BehaviorSubject<Clase[]>([
        { id: 1, nombre: "ingles", dificultad: "intermedia" },
        { id: 2, nombre: "anatomia", dificultad: "dificil" },
    ]);

    constructor() { }

    obtenerClases(): Observable<Clase[]> {
        return this.clasesSubject.asObservable();
    }

    agregarClase(clase: Clase): void {
        const clasesActuales = this.clasesSubject.getValue();
        this.clasesSubject.next([...clasesActuales, clase]);
    }

    editarClase(claseEditado: Clase): void {
        const clasesActuales = this.clasesSubject.getValue().map(clase =>
            clase.id === claseEditado.id ? claseEditado : clase
        );
        this.clasesSubject.next(clasesActuales);
    }

    eliminarClase(id: number): void {
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
                const clasesActuales = this.clasesSubject.getValue().filter(clase => clase.id !== id);
                this.clasesSubject.next(clasesActuales);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El clase ha sido eliminado.",
                    icon: "success"
                });
            }
        });

    }
}


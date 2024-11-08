import { Curso } from "./curso.interface";

export interface Alumno {
    id: number;
    nombre: string;
    apellido: string;
    curso: Curso[];
}
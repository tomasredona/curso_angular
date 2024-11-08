// // src/app/store/alumnos.efectos.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { AlumnosService } from '../core/services/alumnos.service';
// import * as AlumnosActions from './alumnos.acciones';
// import { EMPTY } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';

// @Injectable()
// export class AlumnosEfectos {
//     constructor(
//         private actions$: Actions,
//         private alumnosService: AlumnosService
//     ) { }

//     // Efecto para cargar alumnos
//     cargarAlumnos$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AlumnosActions.cargarAlumnos),
//             mergeMap(() =>
//                 this.alumnosService.obtenerAlumnos().pipe(
//                     map((alumnos) => AlumnosActions.cargarAlumnosExito({ alumnos })),
//                     catchError((error) => [AlumnosActions.cargarAlumnosFallo({ error })])
//                 )
//             )
//         )
//     );

//     // Efecto para agregar un nuevo alumno
//     agregarAlumno$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AlumnosActions.agregarAlumno),
//             mergeMap((action) =>
//                 this.alumnosService.agregarAlumno(action.alumno).pipe(
//                     map(() => AlumnosActions.cargarAlumnos()),
//                     catchError(() => EMPTY)
//                 )
//             )
//         )
//     );

//     // Efecto para editar un alumno
//     editarAlumno$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AlumnosActions.editarAlumno),
//             mergeMap((action) =>
//                 this.alumnosService.editarAlumno(action.alumno).pipe(
//                     map(() => AlumnosActions.cargarAlumnos()),
//                     catchError(() => EMPTY)
//                 )
//             )
//         )
//     );

//     // Efecto para eliminar un alumno
//     eliminarAlumno$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AlumnosActions.eliminarAlumno),
//             mergeMap((action) =>
//                 this.alumnosService.eliminarAlumno(action.id).pipe(
//                     map(() => AlumnosActions.cargarAlumnos()),
//                     catchError(() => EMPTY)
//                 )
//             )
//         )
//     );
// }

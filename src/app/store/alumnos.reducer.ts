// // src/app/store/alumnos.reducer.ts
// import { createReducer, on } from '@ngrx/store';
// import { Alumno } from '../utilities/interfaces/alumno.interface';
// import * as AlumnosActions from './alumnos.acciones';

// // Estado inicial
// export interface AlumnosState {
//     alumnos: Alumno[];
//     loading: boolean;
//     error: string | null;
// }

// export const initialState: AlumnosState = {
//     alumnos: [],
//     loading: false,
//     error: null,
// };

// // Reducer que maneja las acciones
// export const alumnosReducer = createReducer(
//     initialState,
//     on(AlumnosActions.cargarAlumnos, (state) => ({
//         ...state,
//         loading: true,
//     })),
//     on(AlumnosActions.cargarAlumnosExito, (state, { alumnos }) => ({
//         ...state,
//         loading: false,
//         alumnos,
//     })),
//     on(AlumnosActions.cargarAlumnosFallo, (state, { error }) => ({
//         ...state,
//         loading: false,
//         error,
//     })),
//     on(AlumnosActions.agregarAlumno, (state, { alumno }) => ({
//         ...state,
//         alumnos: [...state.alumnos, alumno],
//     })),
//     on(AlumnosActions.editarAlumno, (state, { alumno }) => ({
//         ...state,
//         alumnos: state.alumnos.map((a) =>
//             a.id === alumno.id ? { ...a, ...alumno } : a
//         ),
//     })),
//     on(AlumnosActions.eliminarAlumno, (state, { id }) => ({
//         ...state,
//         alumnos: state.alumnos.filter((alumno) => alumno.id !== id),
//     }))
// );

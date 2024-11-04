import { TestBed } from '@angular/core/testing';
import { AlumnosService } from './alumnos.service';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import Swal from 'sweetalert2';

describe('AlumnosService', () => {
    let service: AlumnosService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlumnosService);

        // Crea un espía en Swal.fire y configurarlo para devolver un resultado simulado
        spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    });

    it('debería crearse el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('debería obtener la lista de alumnos inicial', (done) => {
        service.obtenerAlumnos().subscribe((alumnos) => {
            expect(alumnos.length).toBe(2);
            expect(alumnos[0].nombre).toBe('Carlos');
            done();
        });
    });

    it('debería agregar un nuevo alumno', (done) => {
        const nuevoAlumno: Alumno = { id: 3, nombre: 'Ana', apellido: 'Perez', carrera: 'Matemática' };
        service.agregarAlumno(nuevoAlumno);

        service.obtenerAlumnos().subscribe((alumnos) => {
            expect(alumnos.length).toBe(3);
            expect(alumnos[2]).toEqual(nuevoAlumno);
            done();
        });
    });

    it('debería editar un alumno existente', (done) => {
        const alumnoEditado: Alumno = { id: 1, nombre: 'Carlos', apellido: 'Gonzalez', carrera: 'Quimica' };
        service.editarAlumno(alumnoEditado);

        service.obtenerAlumnos().subscribe((alumnos) => {
            const alumno = alumnos.find(a => a.id === alumnoEditado.id);
            expect(alumno?.apellido).toBe('Gonzalez');
            done();
        });
    });

    it('debería eliminar un alumno', (done) => {

        service.eliminarAlumno(1);

        setTimeout(() => {
            service.obtenerAlumnos().subscribe((alumnos) => {
                expect(alumnos.length).toBe(1);
                expect(alumnos.find(a => a.id === 1)).toBeUndefined();
                done();
            });
        }, 0);
    });
});

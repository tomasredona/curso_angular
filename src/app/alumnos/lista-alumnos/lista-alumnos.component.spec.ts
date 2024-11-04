import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { Alumno } from '../../utilities/interfaces/alumno.interface';
import { AlumnosService } from '../../core/services/alumnos.service';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';

describe('ListaAlumnosComponent', () => {
    let component: ListaAlumnosComponent;
    let fixture: ComponentFixture<ListaAlumnosComponent>;
    let alumnosService: jasmine.SpyObj<AlumnosService>;
    let matDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        const alumnosServiceSpy = jasmine.createSpyObj('AlumnosService', [
            'obtenerAlumnos',
            'agregarAlumno',
            'editarAlumno',
            'eliminarAlumno',
        ]);

        const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [ListaAlumnosComponent],
            providers: [
                { provide: AlumnosService, useValue: alumnosServiceSpy },
                { provide: MatDialog, useValue: matDialogSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListaAlumnosComponent);
        component = fixture.componentInstance;
        alumnosService = TestBed.inject(AlumnosService) as jasmine.SpyObj<AlumnosService>;
        matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería suscribirse a los alumnos y configurar el dataSource en ngAfterViewInit', () => {
        const alumnos: Alumno[] = [
            { id: 1, nombre: 'Carlos', apellido: 'Garcia', carrera: 'Quimica' },
            { id: 2, nombre: 'Juan', apellido: 'Lopez', carrera: 'Fisica' },
        ];
        alumnosService.obtenerAlumnos.and.returnValue(of(alumnos));

        component.ngAfterViewInit();

        expect(alumnosService.obtenerAlumnos).toHaveBeenCalled();
        expect(component.dataSource.data).toEqual(alumnos);
    });

    it('debería abrir el diálogo para crear un nuevo alumno en crearAlumno', () => {
        const nuevoAlumno: Alumno = { id: 3, nombre: 'Ana', apellido: 'Perez', carrera: 'Matemática' };
        const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(nuevoAlumno) });
        matDialog.open.and.returnValue(dialogRefSpy);

        component.crearAlumno();

        expect(matDialog.open).toHaveBeenCalledWith(AbmAlumnosComponent, {
            height: '300px',
            width: '600px',
        });
        expect(alumnosService.agregarAlumno).toHaveBeenCalledWith(nuevoAlumno);
    });

    it('debería abrir el diálogo para editar un alumno existente en editarAlumno', () => {
        const alumno: Alumno = { id: 1, nombre: 'Carlos', apellido: 'Garcia', carrera: 'Quimica' };
        const alumnoEditado: Alumno = { ...alumno, nombre: 'Carlos Editado' };
        const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(alumnoEditado) });
        matDialog.open.and.returnValue(dialogRefSpy);

        component.editarAlumno(alumno);

        expect(matDialog.open).toHaveBeenCalledWith(AbmAlumnosComponent, {
            height: '300px',
            width: '600px',
            data: { alumno: alumno, editar: true },
        });
        expect(alumnosService.editarAlumno).toHaveBeenCalledWith(alumnoEditado);
    });

    it('debería llamar a eliminarAlumno del servicio en borrarAlumno', () => {
        const alumnoId = 1;

        component.borrarAlumno(alumnoId);

        expect(alumnosService.eliminarAlumno).toHaveBeenCalledWith(alumnoId);
    });

    it('debería cancelar la suscripción en ngOnDestroy', () => {
        const fakeSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
        component.alumnosSubscription = fakeSubscription;

        component.ngOnDestroy();

        expect(fakeSubscription.unsubscribe).toHaveBeenCalled();
    });

});

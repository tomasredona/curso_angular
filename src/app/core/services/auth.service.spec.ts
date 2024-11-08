import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
    });

    it('debería ser creado', () => {
        expect(service).toBeTruthy();
    });

    describe('login', () => {
        it('debería autenticar al usuario con credenciales correctas', (done) => {
            service.login('user', 'password').subscribe(isAuthenticated => {
                expect(isAuthenticated).toBeTrue();
                expect(localStorage.getItem('authToken')).toBeTruthy();
                service.isAuthenticated().subscribe(authStatus => {
                    expect(authStatus).toBeTrue();
                    done();
                });
            });
        });

        it('no debería autenticar al usuario con credenciales incorrectas', (done) => {
            service.login('user', 'wrongPassword').subscribe(isAuthenticated => {
                expect(isAuthenticated).toBeFalse();
                expect(localStorage.getItem('authToken')).toBeNull();
                service.isAuthenticated().subscribe(authStatus => {
                    expect(authStatus).toBeFalse();
                    done();
                });
            });
        });
    });

    describe('logout', () => {
        it('debería eliminar el token y actualizar el estado de autenticación', () => {
            service.login('user', 'password');
            service.logout();
            expect(localStorage.getItem('authToken')).toBeNull();
            service.isAuthenticated().subscribe(authStatus => {
                expect(authStatus).toBeFalse();
            });
        });
    });

    describe('isAuthenticated', () => {
        it('debería retornar el estado actual de autenticación como un observable', (done) => {
            service.login('user', 'password').subscribe(() => {
                service.isAuthenticated().subscribe(authStatus => {
                    expect(authStatus).toBeTrue();
                    done();
                });
            });
        });

        it('debería retornar falso si el usuario no está autenticado', (done) => {
            service.logout();
            service.isAuthenticated().subscribe(authStatus => {
                expect(authStatus).toBeFalse();
                done();
            });
        });
    });
});


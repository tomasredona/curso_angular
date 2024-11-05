import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private mockUser = { username: 'user', password: 'password' };

    constructor() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.isAuthenticatedSubject.next(true);
        }
    }

    login(username: string, password: string): Observable<boolean> {
        const isAuthenticated = username === this.mockUser.username && password === this.mockUser.password;
        if (isAuthenticated) {
            const token = btoa(`${username}:${new Date().getTime()}`);
            localStorage.setItem('authToken', token);
            this.isAuthenticatedSubject.next(true);
            return of(true);
        } else {
            this.isAuthenticatedSubject.next(false);
            return of(false);
        }
    }

    logout(): void {
        localStorage.removeItem('authToken');
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }
}

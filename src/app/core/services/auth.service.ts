// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private mockUser = { username: 'user', password: 'password' };
    constructor() { }

    login(username: string, password: string): Observable<boolean> {
        const isAuthenticated = username === this.mockUser.username && password === this.mockUser.password;
        this.isAuthenticatedSubject.next(isAuthenticated);
        return this.isAuthenticatedSubject.asObservable();
    }

    logout(): void {
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }
}

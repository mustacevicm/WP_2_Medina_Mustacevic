import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost/wp2-api';
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login.php`, credentials)
            .pipe(tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }));
    }

    register(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register.php`, user);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
    changePassword(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/change_password.php`, data);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;
  private userKey = 'auth_user';

  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, user).pipe(
      tap((response) => this.handleLoginAuthentication(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.loggedIn.next(false);
  }

  private handleLoginAuthentication(response: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(response));
    this.loggedIn.next(true);
  }

  getUser(): any | null {
    const userJson = localStorage.getItem(this.userKey);
    if (!userJson) {
      return null;
    }
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  getUserId(): number {
    const user = this.getUser();
    return user?.id ?? null; // Returnează `userId` sau `null` dacă nu este disponibil
  }

  private isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

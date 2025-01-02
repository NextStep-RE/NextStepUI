import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/Authentication`;
  private tokenKey = 'auth_token';
  private emailKey = 'auth_email';
  private userIDKey = 'user_id';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers });
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap(
        (response) => this.handleLoginAuthentication(response),
        (error) => console.error('Login error:', error)
      )
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.userIDKey);
  }

  private handleLoginAuthentication(response: any): void {
    console.log('Authentication response:', response);

    if (response && response.token) {
      localStorage.setItem(this.tokenKey, response.token);
    }

    if (response && response.email) {
      localStorage.setItem(this.emailKey, response.email);
    }

    if (response && response.userId) {
      localStorage.setItem(this.userIDKey, response.userId.toString());
    }

  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const userIdString = localStorage.getItem(this.userIDKey);

    if (userIdString === null || userIdString === undefined) {
      return null;
    }

    const userId = parseInt(userIdString, 10);

    if (isNaN(userId)) {
      return null;
    }

    return userId;
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

}

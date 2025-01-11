import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;
  private userKey = 'auth_user'; // Key to store the user object

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, user).pipe(
      tap(
        (response) => this.handleLoginAuthentication(response),
        (error) => console.error('Login error:', error)
      )
    );
  }

  logout() {
    localStorage.removeItem(this.userKey);
  }

  private handleLoginAuthentication(response: any): void {
    console.log('Authentication response:', response);

    // Store the entire user object in localStorage as a JSON string
    localStorage.setItem(this.userKey, JSON.stringify(response));
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

  isLoggedIn(): boolean {
    // Check if the user object exists in localStorage
    const user = this.getUser();
    return user !== null;
  }
}

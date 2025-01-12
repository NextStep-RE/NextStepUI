import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';  // URL-ul de bază pentru backend
  private educationUrl = `${this.baseUrl}/educations`;
  private experienceUrl = `${this.baseUrl}/experiences`;
  private userUrl = `${this.baseUrl}/users`; // Endpoint pentru operațiuni legate de utilizatori

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // EDUCAȚII

  /**
   * Obține toate educațiile sau doar cele asociate unui userId
   * @param userId - ID-ul utilizatorului
   */
  getEducations(userId?: number): Observable<any[]> {
    const url = userId ? `${this.educationUrl}?userId=${userId}` : this.educationUrl;
    return this.http.get<any[]>(url);
  }

  /**
   * Creează o nouă educație
   * @param educationRequestDto - Obiectul educației de creat
   */
  createEducation(educationRequestDto: any): Observable<any> {
    return this.http.post<any>(this.educationUrl, educationRequestDto, {
      headers: this.headers,
    });
  }

  /**
   * Șterge o educație după ID
   * @param id - ID-ul educației de șters
   */
  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.educationUrl}/${id}`);
  }

  // EXPERIENȚE

  /**
   * Obține toate experiențele sau doar cele asociate unui userId
   * @param userId - ID-ul utilizatorului
   */
  getExperiences(userId?: number): Observable<any[]> {
    const url = userId ? `${this.experienceUrl}?userId=${userId}` : this.experienceUrl;
    return this.http.get<any[]>(url);
  }

  /**
   * Creează o nouă experiență
   * @param experienceRequestDto - Obiectul experienței de creat
   */
  createExperience(experienceRequestDto: any): Observable<any> {
    return this.http.post<any>(this.experienceUrl, experienceRequestDto, {
      headers: this.headers,
    });
  }

  /**
   * Șterge o experiență după ID
   * @param id - ID-ul experienței de șters
   */
  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.experienceUrl}/${id}`);
  }

  // UTILIZATORI

  /**
   * Obține un utilizator după ID
   * @param id - ID-ul utilizatorului
   */
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/${id}`);
  }
}

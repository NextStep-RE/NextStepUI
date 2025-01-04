import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Internship, LoadInternships, UpdateInternship } from '../models/internship.model';

@Injectable({
  providedIn: 'root',
})
export class InternshipsService {
  private apiUrl = `${environment.apiUrl}/internships`;

  constructor(private http: HttpClient) {}

  loadInternships(
    loadInternships: LoadInternships
  ): Observable<{ totalCount: number; internships: Internship[] }> {
    let params = new HttpParams()
      .set('offset', (loadInternships.pageNumber * loadInternships.pageSize).toString())
      .set('limit', loadInternships.pageSize.toString());

    if (loadInternships.searchInput) {
      params = params.append('search', loadInternships.searchInput);
    }

    if (loadInternships.sortCriteria && loadInternships.sortDirection) {
      params = params
        .append('sortCriteria', loadInternships.sortCriteria)
        .append('sortDirection', loadInternships.sortDirection);
    }

    if (loadInternships.filter) {
      params = params.append('filter', loadInternships.filter);
    }

    return this.http
      .get<{ items: Internship[]; totalCount: number }>(this.apiUrl, { params })
      .pipe(
        map((response) => ({
          internships: response.items,
          totalCount: response.totalCount,
        }))
      );
  }

  getInternship(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.apiUrl}/${id}`);
  }

  addInternship(internship: Partial<Internship>): Observable<Internship> {
    return this.http.post<Internship>(this.apiUrl, internship);
  }

  updateInternship(id: number, internship: UpdateInternship): Observable<UpdateInternship> {
    return this.http.put<UpdateInternship>(`${this.apiUrl}/${id}`, internship);
  }

  deleteInternship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

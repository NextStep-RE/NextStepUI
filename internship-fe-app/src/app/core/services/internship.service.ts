import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterInternship, Internship } from '../models/internship.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InternshipService {

  constructor(private http: HttpClient) {}

  getAllInternships(offset?: number, limit?: number, filter?: FilterInternship): Observable<Internship[]> {
    let params = new HttpParams();
    
    // Add pagination params
    if (offset) params = params.set('offset', offset.toString());
    if (limit) params = params.set('limit', limit.toString());
    
    // Add the filter params
    if (filter) {
      if (filter.title) params = params.set('title', filter.title);
      if (filter.companyName) params = params.set('companyName', filter.companyName);
      if (filter.location) params = params.set('location', filter.location);
      if (filter.startDate) params = params.set('startDate', filter.startDate.toISOString());
      if (filter.endDate) params = params.set('endDate', filter.endDate.toISOString());
      if (filter.applicationDeadline) params = params.set('applicationDeadline', filter.applicationDeadline.toISOString());
      if (filter.requirements && filter.requirements.length > 0) {
        params = params.set('requirements', filter.requirements.join(','));
      }
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
      if (filter.ascending !== undefined) params = params.set('ascending', filter.ascending.toString());
    }

    return this.http.get<Internship[]>(`${environment.apiUrl}/internships`, { params });
  }

  getInternshipById(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${environment.apiUrl}/internships/${id}`);
  }
}

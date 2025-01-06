import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Internship } from '../models/internship.model';
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class InternshipService {

  constructor(private http: HttpClient) {}

  getAllInternships(offset?: number, limit?: number, searchDTO?: any): Observable<Internship[]> {
    let params = new HttpParams();
    
    // Add pagination params
    if (offset) params = params.set('offset', offset.toString());
    if (limit) params = params.set('limit', limit.toString());
    
    // Add the search DTO parameters, ensuring each field is added to the URL
    if (searchDTO) {
      if (searchDTO.title) params = params.set('title', searchDTO.title);
      if (searchDTO.companyName) params = params.set('companyName', searchDTO.companyName);
      if (searchDTO.location) params = params.set('location', searchDTO.location);
      if (searchDTO.startDate) params = params.set('startDate', searchDTO.startDate.toISOString());
      if (searchDTO.endDate) params = params.set('endDate', searchDTO.endDate.toISOString());
      if (searchDTO.applicationDeadline) params = params.set('applicationDeadline', searchDTO.applicationDeadline.toISOString());
      if (searchDTO.requirements && searchDTO.requirements.length > 0) {
        params = params.set('requirements', searchDTO.requirements.join(','));
      }
      if (searchDTO.sortBy) params = params.set('sortBy', searchDTO.sortBy);
      if (searchDTO.ascending !== undefined) params = params.set('ascending', searchDTO.ascending.toString());
    }

    return this.http.get<Internship[]>(environment.apiUrl, { params });
  }

  getInternshipById(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${environment.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterInternship, Internship } from '../models/internship.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InternshipService {
  constructor(private http: HttpClient) {}

  getAllInternships(
    offset: number,
    limit: number,
    filter?: FilterInternship
  ): Observable<{ totalNumber: number; internships: Internship[] }> {
    let params = new HttpParams();

    params = params.set('offset', offset.toString());
    params = params.set('limit', limit.toString());

    if (filter) {
      if (filter.title) params = params.set('title', filter.title);
      if (filter.companyName)
        params = params.set('companyName', filter.companyName);
      if (filter.location) params = params.set('location', filter.location);
      if (filter.startDate)
        params = params.set('startDate', filter.startDate.toISOString());
      if (filter.endDate)
        params = params.set('endDate', filter.endDate.toISOString());
      if (filter.applicationDeadline)
        params = params.set(
          'applicationDeadline',
          filter.applicationDeadline.toISOString()
        );
      if (filter.requirements && filter.requirements.length > 0) {
        params = params.set('requirements', filter.requirements.join(','));
      }
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
      if (filter.ascending !== undefined)
        params = params.set('ascending', filter.ascending.toString());
    }

    return this.http
      .get<{ totalNumber: number; internships: Internship[] }>(
        `${environment.apiUrl}/internships`,
        { params }
      )
      .pipe(
        map((response) => ({
          totalNumber: response.totalNumber,
          internships: response.internships.map((internship) => ({
            ...internship,
            startDate: new Date(internship.startDate),
            endDate: new Date(internship.endDate),
            dateAdded: new Date(internship.dateAdded),
            applicationDeadline: new Date(internship.applicationDeadline),
          })),
        }))
      );
  }

  getInternshipById(id: number): Observable<Internship> {
    return this.http
      .get<Internship>(`${environment.apiUrl}/internships/${id}`)
      .pipe(
        map((internship) => ({
          ...internship,
          startDate: new Date(internship.startDate),
          endDate: new Date(internship.endDate),
          dateAdded: new Date(internship.dateAdded),
          applicationDeadline: new Date(internship.applicationDeadline),
        }))
      );
  }
}

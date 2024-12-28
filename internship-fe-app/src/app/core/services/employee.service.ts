import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/userInfo.model';
import { environment } from '../../../environments/environment.development';
import { UserProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public selectedEmployeeId: number = 1;

  setSelectedEmployeeId(id: number): void {
    this.selectedEmployeeId = id;
  }

  getSelectedEmployeeId(): number {
    return this.selectedEmployeeId;
  }

  constructor(private http: HttpClient) {}

  getUserInfo(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.apiUrl + `/employee/${id}`);
  }

  getAllUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(environment.apiUrl + '/employee');
  }
}

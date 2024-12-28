import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getAllDocuments(customerId: number): Observable<Document[]> {
    return this.http.get<Document[]>(
      environment.apiUrl + '/document/' + customerId
    );
  }

  addDocument(customerId: number, documents: File[]): Observable<{}> {
    const doc = documents[0];
    const formData = new FormData();
    formData.append('id', customerId.toString());
    formData.append('files', doc);
    return this.http.post(
      environment.apiUrl + '/customer/add-documents',
      formData
    );
  }

  deleteDocument(customerId: number, documentId: number): Observable<Document> {
    return this.http.delete<Document>(
      environment.apiUrl + '/document/' + customerId + '/' + documentId
    );
  }
}

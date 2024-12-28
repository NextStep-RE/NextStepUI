import { Injectable } from '@angular/core';
import { Document } from '../../core/models/document.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService{
  documents: Document[] = [
    {
      id: 1,
      name: 'General Agreement',
      type: 'pdf',
      date: new Date(2020, 7, 10),
      file: new Uint8Array([21, 31]),
      customerId: 1,
    },
    {
      id: 2,
      name: 'SOW',
      type: 'docx',
      date: new Date(2020, 7, 13),
      file: new Uint8Array([21, 31]),
      customerId: 1,
    },
  ];

  getAllDocuments(): Document[] {
    return this.documents;
  }
}

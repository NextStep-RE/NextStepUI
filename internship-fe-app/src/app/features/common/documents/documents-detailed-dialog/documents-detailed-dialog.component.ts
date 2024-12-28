import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from '../../../../core/models/document.model';

@Component({
  selector: 'app-documents-detailed-dialog',
  templateUrl: './documents-detailed-dialog.component.html',
  styleUrl: './documents-detailed-dialog.component.scss'
})
export class DocumentsDetailedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Document) {}
}

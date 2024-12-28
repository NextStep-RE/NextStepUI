import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-document-loader-popup',
  templateUrl: './document-loader-popup.component.html',
  styleUrl: './document-loader-popup.component.scss'
})
export class DocumentLoaderPopupComponent {
  constructor(private dialogRef: MatDialogRef<DocumentLoaderPopupComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

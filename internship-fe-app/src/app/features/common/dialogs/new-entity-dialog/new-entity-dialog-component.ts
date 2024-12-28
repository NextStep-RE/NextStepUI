import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entity-dialog',
  templateUrl: './new-entity-dialog-component.html',
  styleUrl: './new-entity-dialog-component.scss',
})
export class NewEntityConfirmationDialogComponent {
  @Output() actionButtonClicked = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<NewEntityConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string; actionButtonText: string },
    private router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onActionButtonClick(): void {
    this.actionButtonClicked.emit();
    this.dialogRef.close();
    this.router.navigate(['/customers']);
  }
}

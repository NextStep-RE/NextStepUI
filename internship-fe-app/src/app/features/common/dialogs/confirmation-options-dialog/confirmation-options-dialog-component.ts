import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-options-dialog',
  templateUrl: './confirmation-options-dialog-component.html',
  styleUrl: './confirmation-options-dialog-component.scss',
})
export class ConfirmationOptionsDialogComponent {
  @Output() actionButtonClicked = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<ConfirmationOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      cancelButtonText: string;
      actionButtonText: string;
    }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onActionButtonClick(): void {
    this.actionButtonClicked.emit();
    this.dialogRef.close();
  }
}

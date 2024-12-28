import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationOptionsDialogComponent } from './confirmation-options-dialog/confirmation-options-dialog-component';
import { NewEntityConfirmationDialogComponent } from './new-entity-dialog/new-entity-dialog-component';

@NgModule({
  declarations: [
    ConfirmationOptionsDialogComponent,
    NewEntityConfirmationDialogComponent,
  ],
  imports: [MatDialogModule, CommonModule],
  exports: [
    ConfirmationOptionsDialogComponent,
    NewEntityConfirmationDialogComponent,
  ],
})
export class DialogsModule {}

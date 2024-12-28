import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-detailed-dialog',
  templateUrl: './customer-detailed-dialog.component.html',
  styleUrl: './customer-detailed-dialog.component.scss',
})
export class CustomerDetailedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer) {}
}

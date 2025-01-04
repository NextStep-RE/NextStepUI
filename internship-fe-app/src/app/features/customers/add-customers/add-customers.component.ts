import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ADD_CUSTOMER } from '../../../core/store/actions/customers.actions';
import { NewEntityConfirmationDialogComponent } from '../../common/dialogs/new-entity-dialog/new-entity-dialog-component';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.scss',
})
export class AddCustomersComponent implements OnInit {
  form!: FormGroup;
  selectedCountry: string | '' = '';
  step: 1 | 2 | 3 | 4 | 5 = 1;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onInitForm();
    this.onObserveForm();
  }

  onInitForm(): void {
    this.form = new FormGroup({
      customerGeneralDataForm: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        billingType: ['', Validators.required],
        tva: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      }),

      customerAddressForm: this.fb.group({
        country: ['', Validators.required],
        city: ['', [Validators.required, Validators.minLength(6)]],
        postalCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{6}$')],
        ],
        street: ['', [Validators.required, Validators.minLength(6)]],
        number: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        addition: [''],
      }),
    });
  }

  onObserveForm(): void {
    this.form.get('customerGeneralDataForm')!.valueChanges.subscribe(() => {
      if (this.form.get('customerGeneralDataForm')!.valid && this.step === 1) {
        this.step = 2;
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const customers = {
        ...this.form.value.customerGeneralDataForm,
        ...this.form.value.customerAddressForm,
        country: this.form.value.customerAddressForm.country.name,
      };
      this.store.dispatch(ADD_CUSTOMER({ customer: customers }));
      this.confirmationDialog();
    } else {
      this.toastr.error('The form is invalid.', 'Error occurred.');
    }
  }

  confirmationDialog(): void {
    this.dialog.open(NewEntityConfirmationDialogComponent, {
      data: {
        title: 'New Customer',
        content: 'A new customer added successfully.',
        actionButtonText: 'View',
      },
      width: '600px',
    });
  }

  nextStep(): void {
    if (this.step === 1 || this.step === 2) {
      this.submitted = true;
      if (this.form.get('customerGeneralDataForm')!.valid) {
        this.submitted = false;
        this.step = 3; 
      }
    }
    else if (this.step === 3) {
      this.submitted = true;
      if (this.form.get('customerAddressForm')!.valid) {
        this.submitted = false;
        this.step = 4; 
      }
    }
    else if (this.step === 4) {
      this.step = 5;
    }
  }
  
  previousStep(): void{
    if(this.step > 2)
    {
      this.step --;
    }
  }

  submitFrom(): void {
    if (this.form.valid) {
      this.onSubmit();
    }
  }

  documentUploadConfirmation(): void {
    this.step = 5;
  }
}

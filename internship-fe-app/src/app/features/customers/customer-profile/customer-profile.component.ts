import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  COUNTRIES_DB,
  Country,
} from '@angular-material-extensions/select-country';
import { Customer } from '../../../core/models/customer.model';
import {
  LOAD_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../../../core/store/actions/customers.actions';
import { SELECT_SELECTED_CUSTOMER } from '../../../core/store/selectors/customers.selectors';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../../core/models/document.model';
import { DocumentsTableComponent } from '../../common/documents/documents-table/documents-table.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss',
})
export class CustomerProfileComponent implements OnInit {
  customer!: Customer;
  id!: number;
  customerGeneralDataForm!: FormGroup;
  customerDocumentForm!: FormGroup;
  isEditMode = false;
  showDndArea = false;
  documents: Partial<Document>[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.populateStore();
  }

  populateCountry(): void {
    const selectedCountry = COUNTRIES_DB.find(
      (country: Country) => country.name === this.customer.country
    );
    this.customerGeneralDataForm.patchValue({ country: selectedCountry });
  }

  initForm(): void {
    this.customerGeneralDataForm = this.fb.group({
      name: ['', Validators.required],
      billingType: ['', Validators.required],
      tva: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      addition: [''],
    });

    this.customerDocumentForm = this.fb.group({
      //to be implemented later
    });
    this.customerGeneralDataForm.disable();
  }

  populateStore(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });
    this.store.dispatch(LOAD_CUSTOMER({ id: this.id }));

    this.store
      .select(SELECT_SELECTED_CUSTOMER)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((customer) => {
        this.customer = customer as Customer;
        this.customerGeneralDataForm.patchValue(this.customer);
        this.populateCountry();
      });
  }

  enterEditMode(): void {
    this.isEditMode = true;
    this.customerGeneralDataForm.enable();
  }

  saveChanges(): void {
    if (this.customerGeneralDataForm.valid) {
      const updatedCustomer = {
        Id: this.customer.id,
        Name: this.customerGeneralDataForm.value.name,
        Email: this.customerGeneralDataForm.value.email,
        PhoneNumber: this.customerGeneralDataForm.value.phoneNumber,
        Country: this.customerGeneralDataForm.value.country.name,
        City: this.customerGeneralDataForm.value.city,
        PostalCode: this.customerGeneralDataForm.value.postalCode.toString(),
        Street: this.customerGeneralDataForm.value.street,
        Number: this.customerGeneralDataForm.value.number,
        BillingType: this.customerGeneralDataForm.value.billingType,
        Tva: this.customerGeneralDataForm.value.tva,
        Addition: this.customerGeneralDataForm.value.addition,
      };
      console.log(updatedCustomer);
      this.store.dispatch(UPDATE_CUSTOMER({ customer: updatedCustomer }));

      this.isEditMode = false;
    }
  }

  cancelEdit(): void {
    if (this.isEditMode === false) {
      this.router.navigate(['/customers']);
    } else {
      this.isEditMode = false;
      this.customerGeneralDataForm.patchValue(this.customer);
      this.populateCountry();
      this.customerGeneralDataForm.disable();
    }
  }

  isSaveDisabled(): boolean {
    return !this.isEditMode || this.customerGeneralDataForm.invalid;
  }

  handleFileInputClick(): void {
    this.showDndArea = !this.showDndArea;
  }

  onDocumentUpload(): void {
    this.showDndArea = false;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { CUSTOMER_REDUCER } from '../../core/store/reducers/customers.reducer';
import { CustomersEffects } from '../../core/store/effects/customers.effects';
import { MatSortModule } from '@angular/material/sort';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { CustomersComponent } from './customers.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '../common/progress-bar/progress-bar.component';
import { CheckIconComponent } from '../common/progress-bar/check-icon/check-icon.component';
import { DocumentLoaderComponent } from '../common/document-loader/document-loader.component';
import { DndDirective } from '../../core/directives/dnd.directive';
import { DocumentHistoryViewComponent } from '../common/document-history-view/document-history-view.component';
import { DOCUMENT_REDUCER } from '../../core/store/reducers/documents.reducer';
import { DocumentsEffects } from '../../core/store/effects/documents.effects';
import { DndComponent } from './customer-profile/dnd/dnd.component';
import { DocumentsTableComponent } from '../common/documents/documents-table/documents-table.component';

@NgModule({
  declarations: [
    CustomerSearchComponent,
    CustomersTableComponent,
    CustomersComponent,
    AddCustomersComponent,
    ProgressBarComponent,
    CheckIconComponent,
    DocumentLoaderComponent,
    DocumentHistoryViewComponent,
    DndDirective,
    CustomerProfileComponent,
    DndComponent,
    DocumentsTableComponent,
  ],
  exports: [
    CustomerSearchComponent,
    CustomersTableComponent,
    CustomersComponent,
    AddCustomersComponent,
    DocumentLoaderComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    CdkTableModule,
    MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('customers', CUSTOMER_REDUCER),
    StoreModule.forFeature('documents', DOCUMENT_REDUCER),
    EffectsModule.forFeature([CustomersEffects, DocumentsEffects]),
    RouterModule,
    MatSortModule,
    MatStepperModule,
    MatSelectCountryModule.forRoot('en'),
    MatTabsModule,
    MatSortModule,
    MatProgressBarModule,
  ],
  providers: [provideHttpClient()],
})
export class CustomersModule {}

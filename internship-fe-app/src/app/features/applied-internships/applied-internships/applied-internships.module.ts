import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipListingsComponent } from '../../internships/internship-listings/internship-listings.component';
import { InternshipBoxComponent } from '../../internships/internship-listings/internship-box/internship-box.component';
import { InternshipsComponent } from '../../internships/internships.component';
import { InternshipDetailsComponent } from '../../internships/internship-details/internship-details.component';
import { FilterSidebarComponent } from '../../internships/filter-sidebar/filter-sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { internshipReducer } from '../../../core/store/reducers/internships.reducers';
import { InternshipEffects } from '../../../core/store/effects/internships.effects';
import { AppliedInternshipsComponent } from './applied-internships.component';
import { InternshipsModule } from '../../internships/internships.module';



@NgModule({
  declarations: [
    AppliedInternshipsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
    StoreModule.forFeature('applied-internships', internshipReducer),
    EffectsModule.forFeature([InternshipEffects]),
    InternshipsModule
  ],
  exports: [
    AppliedInternshipsComponent
  ],
})
export class AppliedInternshipsModule { }

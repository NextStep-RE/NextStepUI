import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InternshipListingsComponent } from './internship-listings/internship-listings.component';
import { InternshipBoxComponent } from './internship-listings/internship-box/internship-box.component';
import { InternshipsComponent } from './internships.component';
import { InternshipDetailsComponent } from './internship-details/internship-details.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InternshipEffects } from '../../core/store/effects/internships.effects';
import { internshipReducer } from '../../core/store/reducers/internships.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    InternshipListingsComponent,
    InternshipBoxComponent,
    InternshipsComponent,
    InternshipDetailsComponent,
    FilterSidebarComponent,
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
    MatDatepickerToggle,
    MatDatepickerModule,
    StoreModule.forFeature('internships', internshipReducer),
    EffectsModule.forFeature([InternshipEffects]),
  ],
  exports: [
    InternshipListingsComponent,
    InternshipsComponent,
    FilterSidebarComponent,
  ],
})
export class InternshipsModule {}

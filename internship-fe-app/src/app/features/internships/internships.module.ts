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
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [
    InternshipListingsComponent,
    InternshipsComponent,
    FilterSidebarComponent,
  ],
})
export class InternshipsModule {}

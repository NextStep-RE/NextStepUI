import { UserInfoCardsComponent } from '../common/user-info-cards/user-info-cards.component';
import { TimesheetCardComponent } from '../common/user-info-cards/timesheet-card/timesheet-card.component';
import { UserInformationCardComponent } from '../common/user-info-cards/user-information-card/user-information-card.component';
import { UpcomingEventsComponent } from '../common/upcoming-events/upcoming-events.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatepickerComponent } from '../common/datepicker/datepicker.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PERSONAL_EVENT_REDUCER } from '../../core/store/reducers/personal-events.reducer';
import { PersonalEventsEffect } from '../../core/store/effects/personal-events.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DashboardComponent,
    UpcomingEventsComponent,
    DatepickerComponent,
    UserInfoCardsComponent,
    TimesheetCardComponent,
    UserInformationCardComponent,
    UserInformationCardComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    DatePipe,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatPaginator,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature('personalEvents', PERSONAL_EVENT_REDUCER),
    EffectsModule.forFeature([PersonalEventsEffect])
  ],
  exports: [DashboardComponent],
  providers: [provideNativeDateAdapter()],
})
export class DashboardModule {}
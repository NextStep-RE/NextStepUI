import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkTableModule } from '@angular/cdk/table';

import { HeaderComponent } from './features/common/header/header.component';
import { SearchBarComponent } from './features/common/search-bar/search-bar.component';
import { AccountProfileComponent } from './features/common/header/account-profile/account-profile.component';
import { FooterComponent } from './features/common/footer/footer.component';
import { DropdownProfileMenuComponent } from './features/common/header/account-profile/dropdown-profile-menu/dropdown-profile-menu.component';
import { MenuSidebarComponent } from './features/common/menu-sidebar/menu-sidebar.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { routes } from './app.routes';
import { PROFILE_REDUCER } from './core/store/reducers/user-profiles.reducers';
import { UserProfilesEffects } from './core/store/effects/user-profiles.effects';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { USER_INFO_REDUCER } from './core/store/reducers/userInfo.reducer';
import { UserInfoEffects } from './core/store/effects/userInfo.effects';
import { CustomersModule } from './features/customers/customers.module';
import { DocumentsDetailedDialogComponent } from './features/common/documents/documents-detailed-dialog/documents-detailed-dialog.component';
import { SwitchUsersPopupComponent } from './features/common/switch-users-popup/switch-users-popup.component';
import { InternshipsModule } from './features/internships/internships.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    AccountProfileComponent,
    FooterComponent,
    MenuSidebarComponent,
    DropdownProfileMenuComponent,
    DocumentsDetailedDialogComponent,
    SwitchUsersPopupComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    CdkTableModule,
    StoreModule.forRoot({
      profiles: PROFILE_REDUCER,
      userInfo: USER_INFO_REDUCER,
    }),
    EffectsModule.forRoot([UserInfoEffects]),
    EffectsModule.forFeature([UserProfilesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    CustomersModule,
    AppRoutingModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    MatSelectCountryModule.forRoot('en'),
    RouterModule.forRoot(routes),
    InternshipsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-top-center',
    }),
  ],
})
export class AppModule {}

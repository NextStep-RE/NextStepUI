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
import { MenuSidebarComponent } from './features/common/menu-sidebar/menu-sidebar.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { routes } from './app.routes';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { InternshipsModule } from './features/internships/internships.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppliedInternshipsModule } from './features/applied-internships/applied-internships/applied-internships.module';
import { ExperienceComponent } from './features/experience/experience.component';
import { EducationComponent } from './features/education/education.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { SignupComponent } from './features/authentication/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    AccountProfileComponent,
    FooterComponent,
    MenuSidebarComponent,
    ExperienceComponent,
    EducationComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DashboardModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CdkTableModule,
    StoreModule.forRoot({
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AppRoutingModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    MatSelectCountryModule.forRoot('en'),
    RouterModule.forRoot(routes),
    InternshipsModule,
    AppliedInternshipsModule
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
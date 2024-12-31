import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundPageComponent } from './features/common/not-found-page/not-found-page.component';
import { CustomersComponent } from './features/customers/customers.component';
import { AddCustomersComponent } from './features/customers/add-customers/add-customers.component';
import { CustomerProfileComponent } from './features/customers/customer-profile/customer-profile.component';
import { InternshipListingsComponent } from './features/internships/internship-listings/internship-listings.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { SignupComponent } from './features/authentication/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/my-profile', pathMatch: 'full' },
  { path: 'internships', component: InternshipListingsComponent },
  { path: 'addCustomers', component: AddCustomersComponent },
  { path: 'my-profile', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

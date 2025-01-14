import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundPageComponent } from './features/common/not-found-page/not-found-page.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { SignupComponent } from './features/authentication/signup/signup.component';
import { InternshipsComponent } from './features/internships/internships.component';
import { InternshipDetailsComponent } from './features/internships/internship-details/internship-details.component';
import { AppliedInternshipsComponent } from './features/applied-internships/applied-internships/applied-internships.component';
import { EducationComponent } from './features/education/education.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { UpdateUserComponent } from './features/update-user/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/internships', pathMatch: 'full' },
  { path: 'internships', component: InternshipsComponent },
  { path: 'internship/:id', component: InternshipDetailsComponent },
  { path: 'my-profile', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'applied-internships', component: AppliedInternshipsComponent },
  { path: 'education', component: EducationComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

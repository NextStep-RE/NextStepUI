import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from "../../dashboard/dashboard.module";
import { CommonModule } from '@angular/common';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InternshipsModule } from "../../internships/internships.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading = false;
  showPassword: boolean = false;

  faClose: IconDefinition = faXmark;
  alertErrorMessages: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  removeAlert(index: number): void {
    this.alertErrorMessages.splice(index, 1);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  closeForm() {
    this.router.navigate(['/internships']);
  }

  login() {
    this.isLoading = true;
    const user = {
      email: this.email,
      password: this.password,
    };

    console.log(user);

    this.authenticationService.login(user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        this.router.navigate(['/internships']); // Redirect to the dashboard or another protected route
      },
      (error: { error: any }) => {
        this.isLoading = false;
        const errorMessage = 'Autentificare eșuată: ' + error.error;
        console.error(errorMessage);
        this.alertErrorMessages.push(errorMessage);
      }
    );
  }

  onOutsideClick() {
    this.router.navigate(['/internships']);
  }
}

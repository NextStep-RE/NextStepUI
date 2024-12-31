import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from "../../dashboard/dashboard.module";
import { CommonModule } from '@angular/common';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, DashboardModule, CommonModule],
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
    this.router.navigate(['/my-profile']);
  }

  login() {
    this.isLoading = true;
    const user = {
      email: this.email,
      password: this.password,
    };

    console.log(user)

    this.authenticationService.login(user).subscribe(
      () => {
        console.log('Login successful');

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
    this.router.navigate(['/my-profile']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { InternshipsModule } from '../../internships/internships.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  closeForm() {
    this.router.navigate(['/my-profile']);
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  signup() {
    this.isLoading = true;
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Parolele nu se potrivesc. Vă rugăm să încercați din nou.';
      this.isLoading = false;
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    console.log(user);

    this.authenticationService.register(user).subscribe(
      () => {
        console.log('Registration successful');
        this.isLoading = false;
        const navigationExtras: NavigationExtras = {
          queryParams: { message: 'Înregistrare reușită!' },
        };
        this.router.navigate(['/my-profile'], navigationExtras);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage =
          'Înregistrarea a eșuat. Vă rugăm să verificați datele introduse și să încercați din nou.';
        console.error('Înregistrarea a eșuat:', error.error);
      }
    );
  }

  onOutsideClick() {
    this.router.navigate(['/my-profile']);
  }
}

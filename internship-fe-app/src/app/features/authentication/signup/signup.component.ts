import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
   imports: [FormsModule, DashboardModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  counties: any[] = []; 
  cities: any[] = [];
  selectedCountyIndex: number | null = null; 
  isLoading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
  }

  closeForm() {
    this.router.navigate(['/my-profile']);
  }
  
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  signup() {
    this.isLoading = true;
    if (!this.passwordsMatch()) {
      const errorMessage = 'Parolele nu se potrivesc. Vă rugăm să încercați din nou.';
      this.errorMessage = errorMessage;
      this.isLoading = false;
      return;
    }
    

    const user = {
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      Password: this.password,
    };

    console.log(user)

    this.authenticationService.register(user).subscribe(
      (response) => {
        console.log('Registration successful');
        this.isLoading = false;
        const navigationExtras: NavigationExtras = {
          queryParams: { message: 'Înregistrare reușită!' }
        };
        this.router.navigate(['/my-profile'], navigationExtras);
      },
      (error) => {
        this.isLoading = false;
        const errorMessage = 'Înregistrarea a eșuat. Vă rugăm să verificați datele introduse și să încercați din nou.';
        console.error('Înregistrarea a eșuat:', error.error);
        this.errorMessage = errorMessage;
      }
      
    );
  }

  onOutsideClick() {
    this.router.navigate(['/my-profile']);
  }
}


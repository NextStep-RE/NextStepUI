import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

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
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  closeForm() {
    this.router.navigate(['/internships']);
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  signup() {
    this.isLoading = true;
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Parolele nu se potrivesc. Vă rugăm să încercați din nou.';
      this.toastr.error(this.errorMessage, 'Error');
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
        this.toastr.success('You`re officially one of us now!', 'Registration successful!');
        this.router.navigate(['/internships'], navigationExtras);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage =
          'Uh-oh! That didn`t work. Double-check your details and give it another shot!';
          this.toastr.error(this.errorMessage, 'Error');
        console.error('Uh-oh! That didn`t work. Double-check your details and give it another shot!', 'Error');
      }
    );
  }

  onOutsideClick() {
    this.router.navigate(['/internships']);
  }
}

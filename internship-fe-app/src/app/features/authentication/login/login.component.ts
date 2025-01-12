import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


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
    private router: Router,
    private toastr: ToastrService
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
        this.toastr.success('You`re in! Welcome back, hero!', 'Success');
        this.router.navigate(['/internships']);
      },
      (error: { error: any }) => {
        this.isLoading = false;
        const errorMessage = 'Error' + error.error;
        console.error(errorMessage);
        this.toastr.error('Oops! Wrong password. Were you trying to hack us?', 'Error');
      }
    );
  }

  onOutsideClick() {
    this.router.navigate(['/internships']);
  }
}

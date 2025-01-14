import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'], // optional
})
export class UpdateUserComponent implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
  };

  userId: number | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get userId from AuthenticationService
    this.userId = this.authService.getUserId();

    if (!this.userId) {
      this.router.navigate(['/my-profile']); // Redirect to login page if not logged in
      return;
    }

    // Fetch user details using the userId
    this.userService.getUserById(this.userId.toString()).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.userId) {
      return;
    }

    this.userService.updateUser(this.userId.toString(), this.user).subscribe(
      () => {
        this.router.navigate(['/my-profile']); // Redirect to profile or desired route after update
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}

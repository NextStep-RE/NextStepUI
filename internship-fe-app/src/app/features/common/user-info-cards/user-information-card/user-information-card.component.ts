import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Education, Experience, User } from '../../../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-information-card',
  templateUrl: './user-information-card.component.html',
  styleUrls: ['./user-information-card.component.scss'],
})
export class UserInformationCardComponent implements OnInit {
  isLoading: boolean = true;
  isDisabled = true;
  user: any; // Explicitly type as User or null

  constructor(private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch user data from AuthenticationService
    this.user = this.authService.getUser();
    
    if (this.user) {
      this.isLoading = false; // Set loading to false when data is loaded
    }
  }

  toggleAddCv(): void {
    // Implement logic for toggling CV upload functionality
  }

  toggleVisibility(): void {
    console.log('Visibility toggled');
  }

  // Function to get the most recent education
  goToApplications(): void {
    this.router.navigate(['/applied-internships']);  // Adjust the path as necessary
  }
}
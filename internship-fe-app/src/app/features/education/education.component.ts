import { Component, OnInit } from '@angular/core';
import { Education } from '../../core/models/user.model'; // Adjust path if necessary
import { UserService } from '../../core/services/user.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  isModalOpen: boolean = false;
  educationList: Education[] = [];
  newEducation: Education = {
    id: 0,
    degree: '',
    major: '',
    university: '',
    startDate: new Date(),
    endDate: undefined,
    userId: 0, // Default value, will be updated
  };
  userId: number | null = null; // Dynamically retrieve the userId

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId(); // Retrieve userId from AuthenticationService
    if (this.userId) {
      this.loadEducations();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Fetch education entries for the user using UserService
  loadEducations() {
    if (this.userId) {
      this.userService.getEducations(this.userId).subscribe((data) => {
        this.educationList = data;
      });
    }
  }

  // Save the new education entry using UserService
  saveEducation() {
    if (this.userId) {
      this.newEducation.userId = this.userId; // Assign the correct userId
      this.userService.createEducation(this.newEducation).subscribe((savedEducation) => {
        this.educationList.push(savedEducation); // Add the saved education to the list
        this.closeModal(); // Close the modal after saving
        this.resetNewEducation(); // Reset the form
        
        // Refresh the page to reflect the changes
        location.reload(); // This will refresh the page
      });
    }
  }

  // Reset the newEducation form
  private resetNewEducation() {
    this.newEducation = {
      id: 0,
      degree: '',
      major: '',
      university: '',
      startDate: new Date(),
      endDate: undefined,
      userId: this.userId ?? 0, // Default to userId if available
    };
  }

  // Delete an education entry by ID using UserService
  deleteEducation(id: number) {
    this.userService.deleteEducation(id).subscribe(() => {
      this.educationList = this.educationList.filter((edu) => edu.id !== id); // Remove deleted education from the list
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Experience } from '../../core/models/user.model'; // Adjust the path to your model
import { UserService } from '../../core/services/user.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  newExperience: Experience = {
    id: 0,
    role: '',
    companyName: '',
    description: '',
    startDate: new Date(),
    endDate: undefined,
    userId: 0, // Dynamically set from AuthenticationService
  };
  isModalOpen = false;
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId(); // Get userId dynamically
    if (this.userId) {
      this.loadExperiences();
    }
  }

  openModal(): void {
    this.isModalOpen = true;
    this.newExperience = {
      id: 0,
      role: '',
      companyName: '',
      description: '',
      startDate: new Date(),
      endDate: undefined,
      userId: this.userId ?? 0,
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Fetch experience entries for the user using UserService
  loadExperiences(): void {
    console.log(this.userId);
    if (this.userId) {
      this.userService.getExperiences(this.userId).subscribe((data) => {
        this.experiences = data;
      });
    }
    console.log(this.experiences);
  }

  // Save the new experience entry using UserService
  saveExperience(): void {
    if (this.userId) {
      this.newExperience.userId = this.userId;
      this.userService.createExperience(this.newExperience).subscribe((savedExperience) => {
        this.experiences.push(savedExperience); // Add to list
        this.closeModal();
        // Option 1: Refresh the page to reload all data (whole page reload)
        window.location.reload(); 

        // Option 2: Refresh just the experiences (without page reload)
        // this.loadExperiences();
      });
    }
  }

  // Delete an experience entry by ID using UserService
  deleteExperience(id: number): void {
    this.userService.deleteExperience(id).subscribe(() => {
      this.experiences = this.experiences.filter((exp) => exp.id !== id); // Remove from list
      // Option 1: Refresh the page to reload all data (whole page reload)
      window.location.reload();

      // Option 2: Refresh just the experiences (without page reload)
      // this.loadExperiences();
    });
  }
}

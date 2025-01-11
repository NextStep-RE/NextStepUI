import { Component } from '@angular/core';
import { Education } from '../../core/models/user.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  isModalOpen: boolean = false;

  // List of education entries
  educationList: Education[] = [];

  // New education entry
  newEducation: Education = {
    degree: '',
    major: '',
    university: '',
    startYear: new Date(),
    graduationYear: new Date(),
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveEducation() {
    this.educationList.push({ ...this.newEducation });
    this.closeModal();
  }

  deleteEducation(index: number) {
    this.educationList.splice(index, 1);
  }
}
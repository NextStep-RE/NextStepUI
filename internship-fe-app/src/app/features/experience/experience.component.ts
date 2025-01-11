import { Component } from '@angular/core';
import { Experience } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      role: 'Software Developer Intern',
      company: 'Tech Solutions',
      description: 'Worked on developing web applications using Angular and Node.js.',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-06-15'),
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Web Innovators',
      description: 'Contributed to UI/UX designs and implemented responsive websites.',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-12-31'),
    },
  ];

  constructor(private router: Router){}

  isModalOpen = false;
  newExperience: Experience = {
    role: '',
    company: '',
    description: '',
    startDate: new Date(),
    endDate: undefined,
  };

  openModal(): void {
    this.isModalOpen = true;
    this.newExperience = {
      role: '',
      company: '',
      description: '',
      startDate: new Date(),
      endDate: undefined,
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveExperience(): void {
    this.experiences.push({ ...this.newExperience });
    this.closeModal();
  }

  deleteExperience(index: number): void {
    this.experiences.splice(index, 1);
  }

  onOutsideClick() {
    this.router.navigate(['/my-profile']);
  }
}
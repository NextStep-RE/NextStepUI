import { Component, Input } from '@angular/core';
import { Internship } from '../../../../core/models/internship.model';

@Component({
  selector: 'app-internship-box',
  templateUrl: './internship-box.component.html',
  styleUrl: './internship-box.component.scss',
})
export class InternshipBoxComponent {
  @Input() internship!: Internship;

  isHeartClicked = false;

  toggleHeartColor() {
    this.isHeartClicked = !this.isHeartClicked;
  }

  onMouseEnter() {}

  onMouseLeave() {}

  get truncatedDescription(): string {
    const maxLength = 100;
    return this.internship.description.length > maxLength
      ? this.internship.description.substring(0, maxLength) + '...'
      : this.internship.description;
  }

  viewDetails(internshipId: string): void {
    console.log(`Viewing details for internship with ID: ${internshipId}`);
  }

  isDeadlineApproaching(deadline: Date): boolean {
    const currentDate = new Date();
    const timeDifference = deadline.getTime() - currentDate.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24);
    return daysRemaining <= 10 && daysRemaining >= 0;
  }
}

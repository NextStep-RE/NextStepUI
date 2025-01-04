import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Internship } from '../../../../core/models/internship.model';

@Component({
  selector: 'app-internship-box',
  templateUrl: './internship-box.component.html',
  styleUrls: ['./internship-box.component.scss'],
})
export class InternshipBoxComponent {
  @Input() internship!: Internship;
  @Output() internshipSelected = new EventEmitter<string>(); // Event to emit internship ID

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
    this.internshipSelected.emit(internshipId); // Emit the internship ID to the parent component
  }

  isDeadlineApproaching(deadline: Date): boolean {
    const currentDate = new Date();
    const timeDifference = deadline.getTime() - currentDate.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24);
    return daysRemaining <= 10 && daysRemaining >= 0;
  }

  getRelativeTime(datePosted: Date): string {
    const now = new Date();
    const postedDate = new Date(datePosted);
    const diffInSeconds = Math.floor((now.getTime() - postedDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Posted just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}

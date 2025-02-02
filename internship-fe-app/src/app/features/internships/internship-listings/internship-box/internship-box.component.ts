import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Internship } from '../../../../core/models/internship.model';

@Component({
  selector: 'app-internship-box',
  templateUrl: './internship-box.component.html',
  styleUrls: ['./internship-box.component.scss'],
})
export class InternshipBoxComponent {
  @Input() internship!: Internship;
  @Output() internshipSelected = new EventEmitter<number>();

  isHeartClicked = false;

  toggleHeartColor() {
    this.isHeartClicked = !this.isHeartClicked;
  }

  onMouseEnter() {
  }

  onMouseLeave() {
  }

  viewDetails(internshipId: number): void {
    this.internshipSelected.emit(internshipId);
  }

  isDeadlineApproaching(deadline: Date): boolean {
    const currentDate = new Date();
    const timeDifference = deadline.getTime() - currentDate.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24);
    return daysRemaining <= 10 && daysRemaining >= 0;
  }

  getRelativeTime(datePosted: Date): string {
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now.getTime() - datePosted.getTime()) / 1000
    );

    if (diffInSeconds < 60) return 'Posted just now';
    if (diffInSeconds < 3600)
      return `Posted ${Math.floor(diffInSeconds / 60)} minute${
        Math.floor(diffInSeconds / 60) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 86400)
      return `Posted ${Math.floor(diffInSeconds / 3600)} hour${
        Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 2592000)
      return `Posted ${Math.floor(diffInSeconds / 86400)} day${
        Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 31536000)
      return `Posted ${Math.floor(diffInSeconds / 2592000)} month${
        Math.floor(diffInSeconds / 2592000) > 1 ? 's' : ''
      } ago`;

    return `Posted ${Math.floor(diffInSeconds / 31536000)} year${
      Math.floor(diffInSeconds / 31536000) > 1 ? 's' : ''
    } ago`;
  }
}

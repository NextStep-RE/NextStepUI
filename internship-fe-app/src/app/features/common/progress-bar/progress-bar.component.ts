import { Component, Input } from '@angular/core';
import { AllowedColors, Colors } from '../types/colors';

/*
Steps: 
1 - first icon
2 - first icon, half bar
3 - first icon, half bar, second icon
4 - first icon, second icon, full bar
5 - all 
*/

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() step: 1 | 2 | 3 | 4 | 5 = 1;

  getIconColor(index: 1 | 2 | 3 | 4 | 5): AllowedColors {
    switch (index) {
      case 1:
        return Colors.deep_sky_blue;
      case 2:
        return this.step >= 3 ? Colors.deep_sky_blue : Colors.light_gray;
      default:
        return this.step == 5 ? Colors.deep_sky_blue : Colors.light_gray;
    }
  }

  getProgressValue(): number {
    switch (this.step) {
      case 1:
        return 0;
      case 2:
      case 3:
        return 50;
      default:
        return 100;
    }
  }

  getBarColor(): AllowedColors {
    return this.step >= 2 ? Colors.deep_sky_blue : Colors.light_gray;
  }
}

import { Component, Input } from '@angular/core';
import { AllowedColors } from '../../types/colors';

@Component({
  selector: 'app-check-icon',
  templateUrl: './check-icon.component.html',
  styleUrl: './check-icon.component.scss'
})
export class CheckIconComponent {
  @Input() backgroundColor: AllowedColors = '#D3D4D6';
}

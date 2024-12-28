import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switch-users-popup',
  templateUrl: './switch-users-popup.component.html',
  styleUrl: './switch-users-popup.component.scss'
})
export class SwitchUsersPopupComponent {
  @Input() showPopup: boolean = false;

  hidePopup(): void {
    this.showPopup = false;
  }
}

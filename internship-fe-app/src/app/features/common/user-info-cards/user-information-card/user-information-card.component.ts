import { Component} from '@angular/core';

@Component({
  selector: 'app-user-information-card',
  templateUrl: './user-information-card.component.html',
  styleUrl: './user-information-card.component.scss',
})
export class UserInformationCardComponent {
isLoading: boolean = false;
isDisabled = true;

toggleAddCv():void {}

  toggleVisibility(): void {
    console.log('Visibility toggled');
  }
}

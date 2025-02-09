import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';

@Component({
  selector: 'app-profile-edit',
  imports: [],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  @Input() profile!: Profile;

}

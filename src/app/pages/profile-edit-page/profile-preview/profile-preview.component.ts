import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';

@Component({
  selector: 'app-profile-preview',
  imports: [],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.scss'
})
export class ProfilePreviewComponent {
  @Input() profile!: Profile;

  

}

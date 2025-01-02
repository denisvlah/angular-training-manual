import { Component, Input } from '@angular/core';
import { Profile } from '../../data/services/profile.service';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";

@Component({
  selector: 'app-profile-card',
  imports: [AvatarFullUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

}

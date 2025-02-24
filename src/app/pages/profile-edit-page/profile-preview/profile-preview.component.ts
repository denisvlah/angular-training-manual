import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';
import { MatChipsModule } from '@angular/material/chips';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";
import { ProfileAvatarComponent } from "../../../common-ui/profile-avatar/profile-avatar.component";

@Component({
  selector: 'app-profile-preview',
  imports: [MatChipsModule, AvatarImageComponent, ProfileAvatarComponent],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.scss'
})
export class ProfilePreviewComponent {
  @Input() profile!: Profile;

  

}

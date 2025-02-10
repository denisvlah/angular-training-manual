import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";
import { MatChipsModule } from '@angular/material/chips';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";

@Component({
  selector: 'app-profile-preview',
  imports: [MatChipsModule, AvatarImageComponent],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.scss'
})
export class ProfilePreviewComponent {
  @Input() profile!: Profile;

  

}

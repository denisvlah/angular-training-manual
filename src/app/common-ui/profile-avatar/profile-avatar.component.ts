import { Component, input, Input } from '@angular/core';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";

@Component({
  selector: 'app-profile-avatar',
  imports: [AvatarFullUrlPipe],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.scss'
})
export class ProfileAvatarComponent {
  @Input() avatarUrl: string | null |undefined = null;
  @Input() fullName: string | null |undefined = null;
  @Input() username: string | null |undefined = null;
  

}

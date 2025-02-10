import { Component, Input } from '@angular/core';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";

@Component({
  selector: 'app-avatar-image',
  imports: [AvatarFullUrlPipe],
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.scss'
})
export class AvatarImageComponent {
  @Input() avatarUrl: string | null |undefined = null;


}

import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-upload-avatar',
  imports: [MaterialModule],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss'
})
export class UploadAvatarComponent {

  avatarPreview = signal<string | null>(null);

  fileChanged($event: Event) {
    let element = $event.currentTarget as HTMLInputElement;
    let fileList = element.files as FileList | null;
    if (fileList && fileList.length > 0)
    {
      let file = fileList[0];
      let reader = new FileReader();
      reader.onload = e=>{
        this.avatarPreview.set(e.target?.result?.toString() ?? null);
      };
      reader.readAsDataURL(file);

    }
    //TODO: continue here!  



  }

}

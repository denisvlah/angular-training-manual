import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FileDndDirective } from '../file-dnd.directive';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";

@Component({
  selector: 'app-upload-avatar',
  imports: [MaterialModule, FileDndDirective, AvatarFullUrlPipe],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss',  
})
export class UploadAvatarComponent {  

  @Input() originalAvatar: string | null | undefined = null;
  @Output() fileSelected= new EventEmitter<File>();

  getOriginalAvatar(){    
    return this.originalAvatar;
  }
  
  avatarPreview = signal<string | null>(null);
  disabled = false;
  

  fileChanged($event: Event) {
    let element = $event.currentTarget as HTMLInputElement;
    let fileList = element.files as FileList | null;
    if (fileList && fileList.length > 0) {
      let file = fileList[0];
      this.processFile(file);
    }   
  }

  private processFile(file: File) {    
    let reader = new FileReader();
    reader.onload = e => {      
      this.avatarPreview.set(e.target?.result?.toString() ?? null);
      this.fileSelected.emit(file);
    };
    reader.readAsDataURL(file);
    
    //this.fireTouched();
  }

  handleFileDroped($event: File) {
    if (!this.disabled)
    {
      this.processFile($event);
    }    
  }  

  
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }  

  ngOnInit(): void {
    
  }
}

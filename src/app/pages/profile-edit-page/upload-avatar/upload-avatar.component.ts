import { Component, Input, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FileDndDirective } from '../file-dnd.directive';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-upload-avatar',
  imports: [MaterialModule, FileDndDirective, AvatarFullUrlPipe],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss'
})
export class UploadAvatarComponent implements ControlValueAccessor {

  @Input()
  originalAvatar: string | null | undefined = null;
  
  avatarPreview = signal<string | null>(null);

  reportFileChanged = (file: File) => { };
  reportTouched = () => { };
  disabled = false;
  touched = false;

  fileChanged($event: Event) {
    let element = $event.currentTarget as HTMLInputElement;
    let fileList = element.files as FileList | null;
    if (fileList && fileList.length > 0) {
      let file = fileList[0];
      this.processFile(file);
    }
    //TODO: continue here!  
  }

  private processFile(file: File) {
    let reader = new FileReader();
    reader.onload = e => {
      this.avatarPreview.set(e.target?.result?.toString() ?? null);
    };
    reader.readAsDataURL(file);
    this.reportFileChanged(file);
    this.fireTouched();
  }

  handleFileDroped($event: File) {
    if (!this.disabled)
    {
      this.processFile($event);
    }
    
  }

  writeValue(obj: any): void {
    this.originalAvatar = obj;    
    this.avatarPreview.set(null);
    this.touched = false;
  }

  registerOnChange(fn: any): void {
    this.reportFileChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.reportTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  fireTouched() {
    if (!this.touched) {
      this.touched = true;
      this.reportTouched();
    }
  }
}

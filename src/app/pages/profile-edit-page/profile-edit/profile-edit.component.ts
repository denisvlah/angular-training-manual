import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Profile, ProfileUpdateData } from '../../../data/services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";
import { MatChipInputEvent } from '@angular/material/chips';
import { AppAuthService } from '../../../data/services/auth.service';
import { UploadAvatarComponent } from "../upload-avatar/upload-avatar.component";


export type ProfileDataForm = {
  [field in keyof Partial<Profile>]: FormControl<Profile[field] | null>;
};

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, FilePickerModule, MaterialModule, UploadAvatarComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {

  @Input() profile!: Profile;  

  @Output() updateProfileEvent = new EventEmitter<ProfileUpdateData>();
  
  authService = inject(AppAuthService);
  $profileSkills = signal<string[]>([]);
  

  form = new FormGroup<ProfileDataForm>({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    avatarUrl: new FormControl(),
    description: new FormControl(),
    stack: new FormControl([]),
    id: new FormControl(),
    city: new FormControl(),
    isActive: new FormControl(),
    subscribersAmount: new FormControl(),
  });

  uploadFormControl = new FormControl<File | null>(null);

  ngOnInit(): void {
    console.log('setting my profile:')
    console.log(this.profile);
    this.form.setValue(this.profile);
    this.$profileSkills.set(this.profile.stack ?? []);
  }

  submit() {
    if (this.form.invalid)
    {
      return;
    }

    this.updateProfileEvent.emit({
      avatarFile: this.uploadFormControl.value,
      profile: {
        id: this.form.value.id!,
        username: this.form.value.username!,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        description: this.form.value.description,
        stack: this.form.value.stack
      }
    });
    
  }

  isValid() {
    this.form.valid;
  }

  firstNameValid() {
    return this.form.get(this.nameof('firstName'))?.valid;
  }

  nameof(key: keyof Profile, instance?: Profile): keyof Profile {
    return key;
  }

  removeProfileSkill(profileSkill: string) {
    this.$profileSkills.update(keywords => {
      const index = keywords.indexOf(profileSkill);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      return [...keywords];
    })
  }

  addProfileSkill($event: MatChipInputEvent) {
    const value = ($event.value || '').trim();

    // Add our keyword
    if (value) {
      this.$profileSkills.update(keywords => [...keywords, value]);
    }

    // Clear the input value
    $event.chipInput!.clear();
  }
  restoreForm() {
    this.form.setValue(this.profile);
    this.$profileSkills.set(this.profile.stack ?? []);
  }
  logout() {
    this.authService.logout();
  }
}

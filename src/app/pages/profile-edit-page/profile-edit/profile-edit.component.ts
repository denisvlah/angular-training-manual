import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Profile, ProfileUpdateData } from '../../../data/services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { MatChipInputEvent } from '@angular/material/chips';
import { AppAuthService } from '../../../data/services/auth.service';
import { UploadAvatarComponent } from "../upload-avatar/upload-avatar.component";
import { UserUpdateSchema } from '../../../data/services/rest';


export type ProfileDataForm = {
  [field in keyof Partial<UserUpdateSchema>]: FormControl<UserUpdateSchema[field] | null>;
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

  private file: File | null = null;

  authService = inject(AppAuthService);
  $profileSkills = signal<string[]>([]);


  form = new FormGroup<ProfileDataForm>({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(),
    stack: new FormControl([]),
    city: new FormControl(),
  });


  ngOnInit(): void {
    console.log('setting my profile:')
    console.log(this.profile);
    this.form.setValue({
      city: this.profile.city,
      description: this.profile.description,
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      stack: this.profile.stack
    });
    this.$profileSkills.set(this.profile.stack ?? []);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.updateProfileEvent.emit({
      avatarFile: this.file,
      profile: {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        description: this.form.value.description,
        stack: this.form.value.stack,
        city: this.form.value.city,
      }
    });
    this.file = null;

  }

  isValid() {
    this.form.valid;
  }

  firstNameValid() {
    return this.form.get(this.nameof('firstName'))?.valid;
  }

  nameof(key: keyof UserUpdateSchema, instance?: UserUpdateSchema): keyof UserUpdateSchema {
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
  setFile($event: File) {
    this.file = $event
  }
}

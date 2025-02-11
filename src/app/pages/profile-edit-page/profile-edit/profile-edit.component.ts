import { Component, Input, OnInit, signal } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";
import { MatChipInputEvent } from '@angular/material/chips';


export type ProfileDataForm = {
  [field in keyof Partial<Profile>]: FormControl<Profile[field] | null>;
};

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, FilePickerModule, MaterialModule, AvatarImageComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {


  $profileSkills = signal<string[]>([]);
  @Input() profile!: Profile;

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

  ngOnInit(): void {
    this.form.setValue(this.profile);
    this.$profileSkills.set(this.profile.stack ?? []);
  }

  submit() {
    console.log(this.form.value);
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
}

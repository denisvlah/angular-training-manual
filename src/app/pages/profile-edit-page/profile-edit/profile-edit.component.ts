import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../../data/services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FilePickerModule } from  'ngx-awesome-uploader';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";


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
  ngOnInit(): void {
    console.log(this.profile);
    this.form.setValue(this.profile);
  }
  @Input() profile!: Profile;

  form = new FormGroup<ProfileDataForm> ({    
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    avatarUrl: new FormControl(),
    description: new FormControl(),
    stack: new FormControl([]),
    id: new FormControl(),
    city: new FormControl(),
    isActive  : new FormControl(),
    subscribersAmount: new FormControl(),
  });  

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
}

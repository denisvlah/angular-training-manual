import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfilePreviewComponent } from "./profile-preview/profile-preview.component";
import { Profile, ProfileService, ProfileUpdateData } from '../../data/services/profile.service';
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-edit-page',
  imports: [ProfilePreviewComponent, ProfileEditComponent, MatGridListModule],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.scss'
})
export class ProfileEditPageComponent implements OnInit, OnDestroy {

  public static readonly PATH = 'edit-my-profile';

  profileService = inject(ProfileService);
  profile: Profile | null = null;
  subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.profileService.getMyProfile()
      .subscribe(p => {        
        this.profile = p;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

  updateProfile($event: ProfileUpdateData) {
    this.profileService.updateProfile($event);
  }
}

import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../data/services/profile.service';


@Component({
  selector: 'search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;      
    });

  }
}

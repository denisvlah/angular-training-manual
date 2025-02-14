import { Component, inject, signal } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'search-page',
  imports: [ProfileCardComponent, MaterialModule, FormsModule, MatDatepickerModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class SearchPageComponent {
  
  $profileSkills = signal<string[]>([]);

  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  username: string | null = null;
  registrationDate: Date | null = null;
  city: string | null = null;


  constructor() {
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });

  }
  addProfileSkill($event: MatChipInputEvent) {
    let skills = this.$profileSkills();
    this.$profileSkills.set([...skills, $event.value]);
    $event.chipInput.clear();
  }
  removeProfileSkill(skill: string) {
    let skills = this.$profileSkills();
    var index = skill.indexOf(skill);
    if (index != -1){
      skills.splice(index, 1);
      this.$profileSkills.set(skills);
    }
  }
}

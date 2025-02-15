import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime, filter } from 'rxjs';

interface ISearchForm
{
  username: FormControl<string | null>;  
  city: FormControl<string | null>;
  stack: FormControl<string[] | null>;

}

@Component({
  selector: 'search-page',
  imports: [ProfileCardComponent, MaterialModule,  MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class SearchPageComponent  {
  
  $profileSkills = signal<string[]>([]);

  profileService = inject(ProfileService);
  profiles: Profile[] = [];  
  fb = inject(FormBuilder);
  searchForm: FormGroup<ISearchForm>;


  constructor() {
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
    this.searchForm = this.fb.group<ISearchForm>({
      username: new FormControl<string | null>(null),      
      city: new FormControl<string | null>(null),
      stack: new FormControl<string[] | null>(null),
    });
    
    this.searchForm.valueChanges.pipe(
      debounceTime(500),      
      
    )
    .subscribe((value) => {
      const data = this.searchForm.value;
      this.profileService.searchProfiles(data.username!, data.city!, data.stack).subscribe((profiles) => {
        this.profiles = profiles;
      });
    });

  }
  
  addProfileSkill($event: MatChipInputEvent) {
    let skills = this.$profileSkills();
    this.$profileSkills.set([...skills, $event.value]);
    $event.chipInput.clear();
    this.searchForm.patchValue({stack: this.$profileSkills()});
  }
  removeProfileSkill(skill: string) {
    let skills = this.$profileSkills();
    var index = skill.indexOf(skill);
    if (index != -1){
      skills.splice(index, 1);
      this.$profileSkills.set(skills);
      this.searchForm.patchValue({stack: this.$profileSkills()});
    }
  }
}
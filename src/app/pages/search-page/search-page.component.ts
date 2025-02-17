import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime } from 'rxjs';


interface ISearchForm
{
  firstName: FormControl<string | null>;  
  lastName: FormControl<string | null>;  
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

  public static readonly PATH = 'search-profiles'
  
  $profileSkills = signal<string[]>([]);

  
  profileService = inject(ProfileService);
  profiles: Profile[] = [];  
  fb = inject(FormBuilder);
  searchForm: FormGroup<ISearchForm>;


  constructor() {
    this.profileService.searchProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });

    this.searchForm = this.fb.group<ISearchForm>({
      firstName: new FormControl<string | null>(null),      
      lastName: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      stack: new FormControl<string[] | null>(null),
    });
    
    this.searchForm.valueChanges.pipe(
      debounceTime(500),            
    )
    .subscribe((value) => {
      const data = this.searchForm.value;
      this.profileService.searchProfiles(data.firstName!, data.lastName!, data.city!, data.stack).subscribe((profiles) => {
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
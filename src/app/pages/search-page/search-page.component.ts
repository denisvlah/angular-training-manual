import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { AccountService } from '../../data/services/rest';
import { ProfilesDict, SubscriptionsService } from '../../data/services/subscriptions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ISearchForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  city: FormControl<string | null>;
  stack: FormControl<string[] | null>;
  filter: FormControl<string | null>;
}

@Component({
  selector: 'search-page',
  imports: [ProfileCardComponent, MaterialModule, MatDatepickerModule, ReactiveFormsModule, MatMenuModule, MatRadioModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class SearchPageComponent {

  public static readonly PATH = 'search-profiles'

  $profileSkills = signal<string[]>([]);

  profileService = inject(ProfileService);
  accountService = inject(AccountService);
  subscriptinService = inject(SubscriptionsService);
  profiles: Profile[] = [];
  fb = inject(FormBuilder);
  searchForm: FormGroup<ISearchForm>;

  loading = signal<boolean>(false);
  mySubscriptions: ProfilesDict | null = null;

  constructor() {

    this.searchForm = this.fb.group<ISearchForm>({
      firstName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      stack: new FormControl<string[] | null>(null),
      filter: new FormControl<string | null>("all"),
    });

    this.searchForm.valueChanges.pipe(debounceTime(500))
      .subscribe((value) => {
        this.makeSearch();
      });

    this.subscriptinService.getMySubsriptins()
      .pipe(takeUntilDestroyed())
      .subscribe(d => {
        this.mySubscriptions = d;
      });
    
      this.makeSearch();
  }

  private makeSearch() {
    console.log('loading set to true');
    this.loading.set(true);
    const data = this.searchForm.value;
    let profilesObservable: Observable<Profile[]> | null = null;
    let stackStr = data.stack?.join(",");
    if (data.filter == "all") {
      profilesObservable = this.profileService.searchProfiles(data.firstName!, data.lastName!, data.city!, data.stack);
    }
    else if (data.filter == "subscribers") {
      profilesObservable = this.accountService.getSubscribersAccountSubscribersGet(
        data.firstName!,
        data.lastName!,
        data.city!,
        stackStr)
        .pipe(map(p => p.items as Profile[]));
    }
    else if (data.filter == "subscriptions") {
      profilesObservable = this.accountService.getSubscriptionsAccountSubscriptionsGet(
        data.firstName!,
        data.lastName!,
        data.city!,
        stackStr)
        .pipe(
          map(p => p.items)
        );
    }

    profilesObservable?.subscribe(
      profiles => {
        this.profiles = profiles;
        this.loading.set(false);
        console.log('loading set to false');
      },
      error => {
        this.profiles = [];
        this.loading.set(false);
        console.log('loading set to false');
      }

    );
  }

  addProfileSkill($event: MatChipInputEvent) {
    let skills = this.$profileSkills();
    this.$profileSkills.set([...skills, $event.value]);
    $event.chipInput.clear();
    this.searchForm.patchValue({ stack: this.$profileSkills() });
  }
  removeProfileSkill(skill: string) {
    let skills = this.$profileSkills();
    var index = skill.indexOf(skill);
    if (index != -1) {
      skills.splice(index, 1);
      this.$profileSkills.set(skills);
      this.searchForm.patchValue({ stack: this.$profileSkills() });
    }
  }
}
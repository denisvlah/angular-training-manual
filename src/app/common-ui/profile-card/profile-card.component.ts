import { Component, inject, input, Input, OnInit } from '@angular/core';
import { Profile } from '../../data/services/profile.service';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";
import { ProfilesDict, SubscriptionsService } from '../../data/services/subscriptions.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarFullUrlPipe, NgClass, MaterialModule, RouterModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  private router = inject(Router);


  @Input() profile!: Profile;

  @Input() searchStack: string[] = [];

  private subscriptionsService = inject(SubscriptionsService)

  private mySubscriptions: ProfilesDict | null = null;

  private searchStackCleaned: string[] | null = null;

  

  constructor() {
    this.subscriptionsService.getMySubsriptins()
      .pipe(takeUntilDestroyed())
      .subscribe(d => {
        this.mySubscriptions = d;
      });
  }

  getSearchStackCleaned() {
    if (this.searchStackCleaned == null) {
      this.searchStackCleaned = this.searchStack.map((s) => s.trim().toLocaleLowerCase());
    }
    return this.searchStackCleaned;
  }


  isSearchStackItem(skill: string) {
    let index = this.getSearchStackCleaned().indexOf(skill.trim().toLocaleLowerCase());
    return index != -1;
  }

  subscribe() {
    this.subscriptionsService.subscribe(this.profile);
  }

  alreadySubscribed() {
    if (!this.mySubscriptions) {
      return false;
    }

    return this.profile.id in this.mySubscriptions;
  }

  unsubscribe() {
    this.subscriptionsService.subscribe(this.profile);
  }

  openBlog(blogLink: string) {
    setTimeout(() => {
      this.router.navigate([blogLink]);
    }, 500);

  }

}

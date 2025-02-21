import { Component, inject, input, Input, OnInit } from '@angular/core';
import { Profile } from '../../data/services/profile.service';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";
import { ProfilesDict, SubscriptionsService } from '../../data/services/subscriptions.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarFullUrlPipe, NgClass],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  isSearchStackItem(skill: string) {
    let index = this.searchStack.indexOf(skill);
    return index != -1;
  }


  @Input() profile!: Profile;

  @Input() searchStack: string[] = [];

  private subscriptionsService = inject(SubscriptionsService)

  private mySubscriptions: ProfilesDict | null = null;

  constructor() {
    this.subscriptionsService.getMySubsriptins()
      .pipe(takeUntilDestroyed())
      .subscribe(d => {
        this.mySubscriptions = d;
      });
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

}

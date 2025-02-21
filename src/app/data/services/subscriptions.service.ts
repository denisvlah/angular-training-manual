import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Profile } from './profile.service';
import { AccountService } from './rest';


export type ProfilesDict = {
  [key: number]: Profile
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private accountService = inject(AccountService);

  private mySubscriptionsSubj = new BehaviorSubject<ProfilesDict>({})
  private mySubscriptionsObs = this.mySubscriptionsSubj.asObservable();
  private isInitiated = false;

  constructor() {
  }

  getMySubsriptins(): Observable<ProfilesDict> {
    if (!this.isInitiated) {

      this.accountService.getSubscriptionsAccountSubscriptionsGet()
        .subscribe(p => {
          let profilesDict: ProfilesDict = {};
          for (let profile of p.items) {
            profilesDict[profile.id] = profile as Profile;
          }
          this.mySubscriptionsSubj.next(profilesDict);
        });
      this.isInitiated = true;
    }

    return this.mySubscriptionsObs;
  }

  subscribe(profile: Profile) {
    return this.accountService.subscribeAccountSubscribeAccountIdPost(profile.id).subscribe(p => {
      let currentSubscriptions = this.mySubscriptionsSubj.value;

      let newSubscriptions = { ...currentSubscriptions };
      newSubscriptions[profile.id] = profile;
      this.mySubscriptionsSubj.next(newSubscriptions);
    });
  }

  unsubscribe(profile: Profile) {
    return this.accountService.unsubscribeAccountSubscribeAccountIdDelete(profile.id)
      .subscribe(
        x => {
          let currentSubscriptions = this.mySubscriptionsSubj.value;

          let newSubscriptions = { ...currentSubscriptions };
          delete newSubscriptions[profile.id];
          this.mySubscriptionsSubj.next(newSubscriptions);
        });

  }

}

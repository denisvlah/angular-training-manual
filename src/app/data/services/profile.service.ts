import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, retry, switchMap, tap } from 'rxjs';
import { AccountService, BASE_PATH, UserUpdateSchema } from './rest';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  getProfileById(profileId: string) : Observable<Profile> {
    let profileIdNum = parseInt(profileId);
    return this.accountClient.getAccountAccountAccountIdGet(profileIdNum);
  }

  
  private profileSubject= new BehaviorSubject<Profile>( {id:0, username:''});
  private myProfile$ : Observable<Profile> | null = null; 
  private http = inject(HttpClient);

  accountClient = inject(AccountService);
  basePath = inject(BASE_PATH);  

  getProfiles(): Observable<Profile[]> {
    return this.accountClient.getTestAccountsAccountTestAccountsGet().pipe(map( p =>{
      return p.map(x=>x as Profile)
    }));    
  }

  searchProfiles(firstName?: string, lastName?: string, city?: string, stack?: string[] | null): Observable<Profile[]> {
    let stackStr = '';
    if (stack) {
      stackStr = stack.join(",");
    }
    stack?.join(",");
    return this.accountClient.getAccountsAccountAccountsGet(stackStr, firstName, lastName, city, undefined, undefined, undefined)
      .pipe(
        map(p=> {
          let x: Profile[] = p.items.map(x=>x as Profile);
          return x;
        })
      );
  }

  getMyProfile(): Observable<Profile> {
    if (this.myProfile$ == null) {
      this.myProfile$ = this.profileSubject.asObservable();
      this.accountClient.getMeAccountMeGet()
      .subscribe(
        p=> this.setProfile(p)
      );
    }

    return this.myProfile$!;
  }

  updateProfile(profileData: ProfileUpdateData) {
    let uploadImage$: Observable<Object> | null = null;
    if (profileData.avatarFile) {
      let formData = new FormData();
      formData.append("image", profileData.avatarFile);
      let url = `${this.basePath}/account/upload_image`;
      uploadImage$ = this.http.post(url, formData);      
    }

    let p = profileData.profile;
    let upldateAccount$ = this.accountClient.updateMeAccountMePatch({
      description: p.description,
      firstName: p.firstName,
      lastName: p.lastName,
      stack: p.stack,
      city: p.city
    });

    this.combineUpdateProfile(uploadImage$, upldateAccount$);
  
  }

  private async combineUpdateProfile(uploadImage$: Observable<Object> | null, upldateAccount$: Observable<import("./rest").UserReadSchema>) {
    if (uploadImage$ != null) {
      await firstValueFrom(uploadImage$);
    }
    let p = await firstValueFrom(upldateAccount$);

    this.setProfile({
      id: p.id,
      username: p.username,
      avatarUrl: p.avatarUrl,
      city: p.city,
      description: p.description,
      firstName: p.firstName,
      isActive: p.isActive,
      lastName: p.lastName,
      stack: p.stack,
      subscribersAmount: p.subscribersAmount
    });

  }
  

  private setProfile(profile: Profile){    
    this.profileSubject.next(profile);
  }

  
}

export type ProfileUpdateData = {
  profile: UserUpdateSchema;
  avatarFile: File | null | undefined;
}

export type Profile = {
  id: number;
  username: string;
  avatarUrl?: string | null | undefined;
  subscribersAmount?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  isActive?: boolean | null;
  stack?: Array<string> | null;
  city?: string | null;
  description?: string | null;
}

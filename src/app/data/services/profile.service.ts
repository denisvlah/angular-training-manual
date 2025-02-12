import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, retry, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountService, BASE_PATH } from './rest';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  private profileSubject= new BehaviorSubject<Profile>( {id:0, username:''});
  private myProfile$ : Observable<Profile> | null = null; 
  private http = inject(HttpClient);

  accountClient = inject(AccountService);
  basePath = inject(BASE_PATH);  


  getProfiles(): Observable<Profile[]> {
    console.log(`basePath: ${this.basePath}`);    
    return this.accountClient.getTestAccountsAccountTestAccountsGet().pipe(map( p =>{
      return p.map(x=>x as Profile)
    }));    
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
      formData.append("file", profileData.avatarFile);
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

    this.combileUpdateProfile(uploadImage$, upldateAccount$);
  
  }

  private async combileUpdateProfile(uploadImage$: Observable<Object> | null, upldateAccount$: Observable<import("./rest").UserReadSchema>) {
    if (uploadImage$ != null) {
      await lastValueFrom(upldateAccount$);
    }
    let p = await lastValueFrom(upldateAccount$);

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
  profile: Profile;
  avatarFile: File | null;
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

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http=inject(HttpClient);


  getProfiles(): Observable<Profile[]> {
    const basePath = environment.API_BASE_PATH;
    let url = `${basePath}/account/test_accounts`;
    return this.http.get<Profile[]>(url)
    //TODO: resolve how to properly configure generated http client
    // return this.accountClient.getTestAccountsAccountTestAccountsGet().pipe(map( (p: UserReadSchemaShort[]) =>{
    //   return p.map(x=>x as Profile)
    // }));    
  }
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

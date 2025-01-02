import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http=inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course';

  constructor() { }

  getProfiles(){
    let response = this.http.get<Profile[]>(`${this.baseUrl}/account/test_accounts`);
    return response
    
    
  }
}

export type Profile = {
  id: number,
  username: string,
  avatarUrl: string | null,
  subscribersAmount: number| 0,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string[],
  city: string | null,
  description: string | null
}

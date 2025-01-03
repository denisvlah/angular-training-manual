import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  accesToken: string|null = null;
  refreshToken: string|null|undefined = null;
  http = inject(HttpClient);  
  

  get isAuth(){
    return !!this.accesToken;
  }

  login(payload: {username: string, password: string}) {    
    const basePath = environment.API_BASE_PATH;
    
    let url = `${basePath}/auth/token`;
    console.log(url);
    return this.http.post<AuthResponse>(url, payload)
    .pipe(
      tap(r => {
        this.accesToken = r.access_token;
        this.refreshToken = r.refresh_token;        
      })
    );
  }
}

export type AuthResponse = {
  access_token: string;
  refresh_token: string | null | undefined;
  token_type: string;
}

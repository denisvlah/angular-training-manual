import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  accesToken: string|null = null;
  refreshToken: string|null|undefined = null;
  http = inject(HttpClient);  
  cookieService = inject(CookieService);
  

  get isAuth(){
    if (!this.accesToken){
      this.accesToken = this.cookieService.get('token');      
    }
    return !!this.accesToken;
  }

  login(payload: {username: string, password: string}) {    
    const basePath = environment.API_BASE_PATH;
    
    let url = `${basePath}/auth/token`;

    let formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    
    return this.http.post<AuthResponse>(url, formData)
    .pipe(
      tap(r => {
        this.accesToken = r.access_token;
        this.refreshToken = r.refresh_token;        
        this.cookieService.set('token', r.access_token);
        this.cookieService.set('refreshToken', r.access_token);
      })
    );
  }
}

export type AuthResponse = {
  access_token: string;
  refresh_token: string | null | undefined;
  token_type: string;
}

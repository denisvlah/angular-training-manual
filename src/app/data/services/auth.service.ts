import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';



@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  accesToken: string|null = null;
  refreshToken: string|null|undefined = null;
  http = inject(HttpClient);  
  localStorage = inject(LocalStorageService);
  router = inject(Router)
  

  get isAuth(){
    if (!this.accesToken){
      this.accesToken = this.localStorage.retrieve('token')
      this.refreshToken = this.localStorage.retrieve('refreshToken');
    }
    return !!this.accesToken;
  }

  /**
   * Perform login to the API.
   * 
   * @param payload Username and password to be sent to the API
   * @returns An observable that emits an object with the access token and refresh token
   *          The access token is also stored in the 'token' cookie and the refresh token is stored in the 'refreshToken' cookie
   */
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
        this.localStorage.store('token', r.access_token);
        this.localStorage.store('refreshToken', r.refresh_token);
      })
    );
  }

  refreshAccessToken(){
    let ulr = `${environment.API_BASE_PATH}/auth/refresh`;
    return this.http.post<AuthResponse>(ulr, 
    {
      refresh_token: this.refreshToken,
    })
    .pipe(
      tap(r => {
        this.accesToken = r.access_token;
        this.localStorage.store('token', r.access_token);
        this.refreshToken = r.refresh_token;
      })
    )
    .pipe(      
      catchError(err=>{
        this.logout();
        return throwError(() => err)
      })
    )
  }

  logout(){
    this.accesToken = null;
    this.refreshToken = null;
    this.localStorage.clear('token');
    this.localStorage.clear('refreshToken');
    return this.router.navigate(['login']);
  }  
}

export type AuthResponse = {
  access_token: string;
  refresh_token: string | null | undefined;
  token_type: string;
}

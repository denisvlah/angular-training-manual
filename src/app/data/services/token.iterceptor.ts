import { HttpContextToken, HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, map, Observable, of, switchMap, throwError } from "rxjs";
import { AppAuthService, AuthResponse, REFRESH_TOKEN } from "./auth.service";
import { inject } from "@angular/core";



export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let authService = inject(AppAuthService);
    let token = authService.accesToken;
    

    if (!token) {
        return next(request);
    }
    return addTokenToReq(request, next, token)
        .pipe(
            catchError((err) => {
                if ((err.status === 401 || err.status === 403) && request.context.get(REFRESH_TOKEN)) {
                    request.context.set(REFRESH_TOKEN, false);
                    return  authService.refreshAccessToken().pipe(
                        catchError(e=>{
                            let a: AuthResponse = {
                                access_token: '',
                                refresh_token: '',
                                token_type: ''
                            };
                            console.log('invalid refresh token: ' + e);
                            authService.logout();
                            return of(a);
                        })                       
                        
                    )
                    .pipe(
                        switchMap(r => {
                            return addTokenToReq(request, next, r.access_token);
                        })
                    )
                    ;
                }

                return throwError(()=>err);
            })
        );
}

function addTokenToReq(request: HttpRequest<any>, next: HttpHandlerFn, token: string) {
    let requestClone = request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
    });
    return next(requestClone);
}

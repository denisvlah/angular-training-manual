import { HttpContextToken, HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, catchError, map,filter, Observable, of, switchMap, throwError, tap } from "rxjs";
import { AppAuthService, AuthResponse} from "./auth.service";
import { inject } from "@angular/core";


const refreshingToken$ = new BehaviorSubject<boolean>(false);

export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let authService = inject(AppAuthService);
    let token = authService.accesToken;
    

    if (!token) {
        return next(request);
    }

    return addTokenToReq(request, next, authService)
        .pipe(
            catchError((err) => {
                if ((err.status === 401 || err.status === 403)) {
                    refreshingToken$.next(true);
                    return authService.refreshAccessToken().pipe(
                        catchError(e=>{
                            let a: AuthResponse = {
                                access_token: '',
                                refresh_token: '',
                                token_type: ''
                            };
                            refreshingToken$.next(false)                            
                            authService.logout();
                            return of(a);
                        }),
                        tap(r=>{
                            refreshingToken$.next(false);
                        }),
                        switchMap(r => {
                            return addTokenToReq(request, next, authService);
                        })
                        
                    );
                }
                
                return throwError(()=>err);
            })
        );
}

function addTokenToReq(request: HttpRequest<any>, next: HttpHandlerFn, authService: AppAuthService) {

    if (request.url.endsWith("/auth/refresh"))
    {
        return next(request);
    }
    
    return refreshingToken$
        .pipe(
            filter(v=>v == false),
            switchMap(v=>{
                let requestClone = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${authService.accesToken}`
                    }
                });
                return next(requestClone);
            })
        )
    
}

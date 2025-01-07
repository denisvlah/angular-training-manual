import { HttpContextToken, HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { AppAuthService } from "./auth.service";
import { inject } from "@angular/core";

const REFRESH_TOKEN = new HttpContextToken<boolean>(() => true);

export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let authService = inject(AppAuthService);
    let token = authService.accesToken;
    
    console.log(`can refresh token: ${request.context.get(REFRESH_TOKEN)}`);

    if (!token) {
        return next(request);
    }
    
    return addTokenToReq(request, next, token)
        .pipe(
            catchError((err) => {
                console.log(`can refresh token: ${request.context.get(REFRESH_TOKEN)}`);
                if (err.status === 401 && request.context.get(REFRESH_TOKEN)) {
                    request.context.set(REFRESH_TOKEN, false);
                    return  authService.refreshAccessToken().pipe(
                        switchMap(r => {
                            return addTokenToReq(request, next, r.access_token);
                        })
                    );
                }

                throw err;
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

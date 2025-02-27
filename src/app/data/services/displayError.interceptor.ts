import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from "@angular/core";

export const displayErrorinterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let snackBar = inject(MatSnackBar);
    return next(request)
        .pipe(
            catchError(err => {
                let showError = true;
                if (err.status === 401 || err.statis === 403) {
                    if (!request.url.endsWith("/auth/refresh") && !request.url.endsWith('/auth/token')) {
                        showError = false;
                    }                    
                }
                if (showError){
                    showSnackBar(snackBar, err);
                }
                
                console.log(err);
                throw err;
            })
        );
}

function showSnackBar(snackBar: MatSnackBar, message: any) {
    let error = message?.message || 'unexpecter error happened, check logs';
    snackBar.open(error, undefined, {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: "right",
        panelClass: ['error-snackbar']
    });
}

import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { inject } from "@angular/core";

export const displayErrorinterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let snackBar = inject(MatSnackBar);
    return next(request)
    .pipe(
        catchError(err => {
            showSnackBar(snackBar, err);
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

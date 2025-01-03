import { inject } from "@angular/core"
import { AppAuthService } from "./auth.service"
import { Router } from "@angular/router";

export const canActivateAuthGuard = () => {
    const isLoggedIn = inject(AppAuthService).isAuth;
    if (isLoggedIn){
        return true;
    }
    
    return inject(Router).navigate(['login']);
}
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate 
{
    constructor(
        private router: Router,
        private authSrv: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if ( localStorage.getItem("access_token") !== null ) {
            // check if route is restricted by role
            // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            //     // role not authorised so redirect to home page
            //     this.router.navigate(['/admin/dashboard']);
            //     return false;
            // }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
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

        if ( localStorage.getItem("access_token") !== null ) 
        {
            if( this.authSrv.hasAccess(route.data.menu_id) === false )
            {
                // role not authorised so redirect to home page
                this.authSrv.logout();
                return false;   
            }            

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
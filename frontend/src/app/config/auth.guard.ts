import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
// import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor(private router: Router) {}
        // : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuthenticated = true
        if(!isAuthenticated){
            this.router.navigate(['/login']); // , { queryParams: { returnUrl: state.url }}
            return false;
        }
        return true;
    }

    
}
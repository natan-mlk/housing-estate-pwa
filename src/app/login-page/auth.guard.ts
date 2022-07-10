import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

    constructor(
        private authenticationService: AuthService,
        private router: Router

    ){}

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.userSubject.pipe(
            take(1),
            map(
                user => {
                    if (!!user) {
                        return true;
                    } else {
                        return this.router.createUrlTree([''])
                    }
                }
            )
        )
    }
}
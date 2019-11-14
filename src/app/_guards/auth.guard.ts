import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}
  canActivate(
    routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (routeSnapshot.data.roles && routeSnapshot.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }*/
    if (localStorage.getItem('currentUser')) {
      // authorised so return true
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';
import {Role} from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'role-based-authorization';
  currentUser: User;
  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(data => this.currentUser = data);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.SuperAdmin;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor( private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string) {
    console.log('Inside login method of authService', username);
    return this.http.post<any>(`/users/authenticate`, {username, password}).pipe(map(
      users => {
        this.users = users;
        console.log('------------------------->:', this.users);
        if (this.users && this.users.token) {
          localStorage.setItem('currentUser', JSON.stringify(this.users));
          this.currentUserSubject.next(this.users);
        }
        console.log('user', this.users);
        return this.users;
    }));
  }
  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);

  }
}

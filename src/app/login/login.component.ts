import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUsernameFocused: boolean;
  isPasswordFocused: boolean;
  submitted = false;
  returnUrl: string;
  loading = false;
  data;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.isUsernameFocused = false;
    this.isPasswordFocused = false;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.route.queryParams.subscribe(data => {
      this.data = data;
      console.log('data', this.data);
      this.returnUrl = this.data;
      console.log('data', this.data);
    });
   /* let url = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams.['returnUrl'] || '/';
    console.log('url', this.returnUrl);*/
  }
  get f() { return this.loginForm.controls; }
  onFocus() {
    this.isUsernameFocused = true;
  }

  onFocusPwd() {
    this.isPasswordFocused = true;
  }

  onFocusLoss() {
    this.isUsernameFocused = false;
  }

  onFocusLossPwd() {
    this.isPasswordFocused = false;
  }

  login() {
    console.log('btn clicked');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);

      },
      error => {
        this.loading = false;
      });
  }
}

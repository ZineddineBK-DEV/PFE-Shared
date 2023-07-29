import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  error = '';
  hide = true;
  loginFailed!: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginFailed=false;
    this.loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.error = 'Username or Password is invalid !';
      return;
    } else {
        this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!);
        this.loginFailed=false;
        this.router.navigate(['dashboard/main']);
  }
  }
}

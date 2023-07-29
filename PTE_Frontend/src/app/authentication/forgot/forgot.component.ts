import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass'],
})
export class ForgotComponent implements OnInit {
  emailSendForm!: FormGroup;
  submitted = false;
  error = '';



  constructor(  private formBuilder: FormBuilder , 
                private authService : AuthService,
                private router :Router) {}

  ngOnInit(): void {
    this.emailSendForm = this.formBuilder.group({
     email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
    })
  }
  get f() {
    return this.emailSendForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    this.error = '';
    
     //let email= {email:this.f['email'].value};
    
    if (this.emailSendForm.invalid) {
      this.error = 'Invalid email !';
      this.submitted= false;
      return;
    } else {
      
      this.authService.sendCode(this.f['email'].value);
    }
  }
}


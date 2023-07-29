import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
 

  error = '';
  constructor(private formBuilder: FormBuilder , 
                private authService : AuthService,
                private router :Router) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      gender:[''],
      password: ['',[Validators.required, Validators.minLength(8)]],
      Cpassword: ['',[Validators.required, Validators.minLength(8), this.matchValues('password')]],
      hiringdate: ['',Validators.required],
      birthdate: [''],
      fs:[''],
      nationality:[''],
      departement:['',Validators.required],
      drivingLisence:['',Validators.required],
      address: [''],
      experience: ['',Validators.required],
      phone : ['',[Validators.required,Validators.maxLength(8), Validators.minLength(8)]],
      termcondition: [false],
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[matchTo] === input;
      return isValid ? { 'matchValues': false } : { 'matchValues': true };
    };
  }
  get f() {
    return this.registerForm.controls;
  }
  showForm(){
    console.log(this.registerForm)
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.registerForm.invalid) {
      this.error = 'Invalid data !';
      this.submitted= false;
      return;
    } else {
      this.authService.signup(this.registerForm);
    }
  }

  nationalities=["Tunisia", "French", "American","Dutch","Egyptian","Algerian","Moroccan",]
  
  genders=["Male","Female"]

  departement=["System","networking","Development",]

  fs=["Single","Maried","Divorced",]
    
}


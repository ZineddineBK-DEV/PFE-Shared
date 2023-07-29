import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  private api: string = "http://localhost:3001/api/users/"
  private apiLogin: string = "http://localhost:3001/api/login"
  private token?: string;
  private isAuthenticated = false;
  private userID!: string
  private userRole!: string
  private user!: User;
  private image!: string

  constructor(private http: HttpClient, private router: Router) {
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('currentUser') || '{}')
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  login(email: string, password: string) {
    this.http.post<{ token: string, expiresIn: number, id: string, roles: string, image: string }>(this.apiLogin, { email: email, password: password }).subscribe(response => {
      //console.log(response);
      this.token = response.token;
      if (this.token) {
        this.setAuthTimer(response.expiresIn)
        this.isAuthenticated = true;
        this.userID = response.id;
        this.userRole = response.roles[0]
        this.image = response.image
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate, this.userRole, this.image)

      }
    })
    return this.token;
  }

  signup(form: FormGroup) {
    let success;
    const user = {
      firstName: form.value.fname,
      lastName: form.value.lname,
      email: form.value.email,
      gender: form.value.gender,
      experience: form.value.experience,
      password: form.value.password,
      phone: form.value.phone,
      birthDate: form.value.birthdate,
      FS: form.value.fs,
      nationality: form.value.nationality,
      address: form.value.address,
      departement: form.value.departement,
      hiringDate: form.value.hiringdate,
      drivingLisence: form.value.drivingLisence
    }
    this.http.post(this.api+"signup", user).subscribe(response => {
      let data: any;
      data = response
      console.log(data.message)
      if (!response) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/authentication/signin"])
      return response
    })
    return success;
  }
  logout() {
    // remove user from local storage to log user out
    this.clearAuthData()
  }

  checkAuth() {
    if (!(this.isAuthenticated)) {
      this.router.navigate(['login'])
    }
    return false;
  }
  getToken() { return this.token; }
  getUserId() { return this.userID }
  getRole() {
    this.http.get(this.api + localStorage.getItem("userId")).subscribe(response => {
      this.user = response as User;
      this.userRole != this.user.roles
    })
  }
  setAuthTimer(expiresIn: number) {
    setTimeout(() => {
      this.logout();

    }, expiresIn * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, roles: string, image: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toLocaleString());
    localStorage.setItem("userId", this.userID);
    localStorage.setItem("roles", roles);
    localStorage.setItem("image", image);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    localStorage.removeItem("image");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    this.userID != localStorage.getItem("userId")
    if (!token || !expirationDate) return null;
    return { token: token, expirationDate: new Date(expirationDate) }
  }
  getUser() {
    return this.http.get<User>(this.api + localStorage.getItem("userId"))
  }

  sendCode(email: string) {
    let success;
    this.http.post(this.api+"forgotPassword", { email }).subscribe(response => {
      const idFP=response as string
      if (!response) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/authentication/code"])
      localStorage.setItem("email", email);
      localStorage.setItem("idFP", idFP);
      return response
    })
    return success;
  }


  validateCode(code: string) {
    let success;
    var data = {
      code: code,
      email: localStorage.getItem("email")
    }
    this.http.post(this.api+"validateCode", data).subscribe(response => {
      if (!response) {
        success = false;
        return null;
      }
      success = true

      this.router.navigate(["/authentication/reset"])
      return response
    })
    return success;
  }

  changePassword(pass: string) {
    let success;
    pass
    let id= localStorage.getItem("idFP")
    let mail= localStorage.getItem("email")
      this.http.patch(this.api+"change-psw/"+id, {password:pass,email:mail}).subscribe(response => {
      if (!response) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/authentication/signin"])
      localStorage.removeItem("email")
      localStorage.removeItem("idFP")
      
      return response
    })
    return success;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  api:string= "http://localhost:3001/api/users/"
  imagesURL: string = "http://localhost:3001/static/images/"

  private userID! :string
  private user!: User;
  drivers!:User[]
  applicants!:User[]

  constructor(private http:HttpClient, private router:Router) { }


  
  getUserRequest():Observable<any> {
    return this.http.get(this.api + "signup/requests").pipe(
      catchError(throwError)
    );
  }
  confirmUserRequest(userID: string):Observable<any>{
    return this.http.post(this.api + "confirm-signup/"+userID,{}).pipe(
      catchError(throwError)
    );
  }
  declineUserRequest(userID: string):Observable<any>{
    return this.http.delete(this.api + "delete/"+userID).pipe(
      catchError(throwError)
    );
  }
  getExternalEmployees(): Observable<any>{
    return this.http.get(this.api + "sousTraitant").pipe(
      catchError(throwError)
    );
  }
  getEmployees(): Observable<any>{
    return this.http.get(this.api + "getall").pipe(
      catchError(throwError)
    );
  }
  getAllDrivers(){
    return this.http.get(this.api + "drivers").pipe(
      catchError(throwError)
    );
  }
  getAllApplicants(){
    return this.http.get(this.api + "getall").pipe(
      catchError(throwError)
    );
  }



}

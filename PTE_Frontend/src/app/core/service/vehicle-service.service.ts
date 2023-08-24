import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction, catchError, map, throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { EventInput } from '@fullcalendar/core';
import { FormGroup } from '@angular/forms';
import { VehicleEvent } from '../models/vehicleEvent';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {
  api: string = "http://localhost:3001/api/material/vehicle/"

  constructor(private http: HttpClient, private router: Router) { }

  getVehicles(): Observable<any> {
    return this.http.get(this.api + "getVehicles").pipe(
      catchError(throwError)
    );
  }
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.api + "addVehicle", vehicle).pipe(
      catchError(throwError)
    );
  }
  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(this.api + "deleteVehicle/" + id).pipe(
      catchError(throwError)
    );
  }
  editVehicle(id: string,form: FormGroup): Observable<any> {
    return this.http.put(this.api + "editVehicle/" + id,form).pipe(
      catchError(throwError)
    );
  }
  addEvent(vehicleEvent: VehicleEvent): Observable<any> {
    return this.http.post(this.api + "setevent", vehicleEvent)
  }
  getVehicleEvents(vehicleID:string) {
    return this.http.get(this.api + "getVehicleEvents/"+vehicleID).pipe(
      catchError(throwError)
    );
  }
}

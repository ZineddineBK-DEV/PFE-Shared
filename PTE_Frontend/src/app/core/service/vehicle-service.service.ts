import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction, catchError, map, throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { EventInput } from '@fullcalendar/core';
import { FormGroup } from '@angular/forms';

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
  addVehicles(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.api + "/addVehicle", vehicle).pipe(
      catchError(throwError)
    );
  }
  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(this.api + "/deleteVehicle/" + id).pipe(
      catchError(throwError)
    );
  }
  addEvent(form: FormGroup): Observable<any> {
    return this.http.post(this.api + "setevent", form).pipe(
      catchError(throwError)
    );
  }
  getVehicleEvents(start: string, end: string, vehicleId: string) {
    const startISO = new Date(start).toISOString().slice(0, 16); // format start date
    const endISO = new Date(end).toISOString().slice(0, 16); // format end date
    return this.http.get(`http://localhost:3001/api/material/vehicle/events?start=${startISO}&end=${endISO}&vehicle=${vehicleId}`)
      .pipe(
        map((events: any[]) => {
          const acceptedEvents: EventInput[] = [];
          const rejectedEvents: EventInput[] = [];
  
          events.forEach(event => {
            const eventInput: EventInput = {
              driver:event.driver,
              applicant:event.applicant,
              id:event._id,
              title: event.title,
              start: event.start,
              end: event.end
            };
            console.log(eventInput)
            if (event.isAccepted) {
              acceptedEvents.push(eventInput);
            } else {
              rejectedEvents.push(eventInput);
            }
          });
  
          return { acceptedEvents, rejectedEvents };
        }) as OperatorFunction<Object, { acceptedEvents: EventInput[]; rejectedEvents: EventInput[]; }> // cast to the correct type
      );
  }

}

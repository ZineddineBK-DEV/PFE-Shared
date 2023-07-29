import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from 'src/app/core/models/vehicle';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';

@Component({
  selector: 'app-edit-vehicle-modal',
  templateUrl: './edit-vehicle-modal.component.html',
  styleUrls: ['./edit-vehicle-modal.component.scss']
})
export class EditVehicleModalComponent {
@Input('payload') payload!:Vehicle 
vehicleEdittForm!: FormGroup


constructor(public activeModal: NgbActiveModal,
  private formBuilder: FormBuilder,
  private vehicleService:VehicleServiceService,
  private userService:UserServiceService) {}

  ngOnInit(){
    this.vehicleEdittForm = new FormGroup({
     model:new FormControl('',[Validators.required]),
     registrationNumber:new FormControl('',[Validators.required]),
     type:new FormControl('',[Validators.required]),
  });
  }

  onSubmit(vehicleEdittForm:FormGroup){}
}

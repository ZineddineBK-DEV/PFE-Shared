import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent {
  vehicleEventForm!: FormGroup;
  vehicleEventFailed!:boolean
  submitted = false;
  error = '';
  drivers!:User[]
  users!:User[]

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehicleService:VehicleServiceService,
    private userService:UserServiceService) {}
  ngOnInit(){
    this.getDrivers()
    this.vehicleEventForm = new FormGroup({
     title :new FormControl('',[Validators.required]),
     start:new FormControl('',[Validators.required]),
     end:new FormControl('',[Validators.required]),
     driver:new FormControl('',[Validators.required]),
     destination:new FormControl('',[Validators.required]),
   
  });
  }
  showForm(){
    console.log(this.vehicleEventForm)
  }
  getDrivers(){
    return this.userService.getAllDrivers().subscribe(resultat => {
        this.drivers=resultat as User[]
         //console.log(this.drivers)
      })
  }
  // getApplicants(){
  //   return this.userService.getAllApplicants();

  // }

  onSubmit(vehicleEventForm:FormGroup){
    this.submitted = true;
    this.error = '';
    if (this.vehicleEventForm.invalid) {
      this.error = 'Invalid data !';
      this.submitted= false;
      return;
    } else {
      this.vehicleService.addEvent(this.vehicleEventForm);
    }
  }
}

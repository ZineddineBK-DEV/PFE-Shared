import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { Vehicle } from 'src/app/core/models/vehicle';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
  providers:[ToastrService]

})
export class AddEventModalComponent {
  @Input("data") data!:any
  @Input("vehicle") vehicle!:Vehicle
  vehicleEventForm!: FormGroup;
  vehicleEventFailed!:boolean
  submitted = false;
  error = '';
  drivers!:User[]
  vehicles!: Vehicle[]
  users!:User[]

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehicleService:VehicleServiceService,
    private userService:UserServiceService,
    private toastr: ToastrService) {}
  ngOnInit(){
    this.getDrivers()
    this.getVehicles()
    console.log("modal",this.vehicle._id)
    this.vehicleEventForm = new FormGroup({
     title :new FormControl('',[Validators.required]),
     start:new FormControl('',[Validators.required]),
     end:new FormControl('',[Validators.required]),
     driver:new FormControl('',[Validators.required]),
     //vehicle:new FormControl('',[Validators.required]),
     destination:new FormControl('',[Validators.required]),
  });
  }
 
  injectValues(){
    this.vehicleEventForm.get('vehicle')?.setValue([this.vehicle.model, "||", this.vehicle.registration_number])
  }
  getDrivers(){
    return this.userService.getAllDrivers().subscribe(resultat => {
        this.drivers=resultat as User[]
        console.log(this.drivers)
      })
  }
  getVehicles(){
    return this.vehicleService.getVehicles().subscribe(resultat => {
        this.vehicles=resultat as Vehicle[]
         console.log(this.vehicles)
      })
  }
  

  onSubmit(vehicleEventForm:FormGroup){
    this.submitted = true;
    this.error = '';
    if (vehicleEventForm.invalid) {
      this.error = 'Invalid data !';
      this.submitted= false;
      return;
    } else if(this.vehicleEventForm.value.start>this.vehicleEventForm.value.end){
          this.toastr.error('Invalid date rang', "Error")
        }else {
     
        const vehicleEvent = {
          title: this.vehicleEventForm.value.title,
          start: this.vehicleEventForm.value.start,
          end: this.vehicleEventForm.value.end,
          vehicle: this.vehicle._id,
          driver: this.vehicleEventForm.value.driver,
          destination: this.vehicleEventForm.value.destination,
          applicant: localStorage.getItem("userId"),
          //isAccepted:true
        };
        
      this.vehicleService.addEvent(vehicleEvent).subscribe(resultat=>{
        this.toastr.success('Event added successfully', "Success")
        this.activeModal.dismiss();
      })
      //console.log(vehicleEventForm.value)
    }
  }
}

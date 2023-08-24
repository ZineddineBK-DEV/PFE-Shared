import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/core/models/vehicle';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';

@Component({
  selector: 'app-edit-vehicle-modal',
  templateUrl: './edit-vehicle-modal.component.html',
  styleUrls: ['./edit-vehicle-modal.component.scss'],
  providers: [ToastrService],

})
export class EditVehicleModalComponent {
@Input('payload') payload!:Vehicle
vehicleEdittForm!: FormGroup

constructor(public activeModal: NgbActiveModal,
  private formBuilder: FormBuilder,
  private vehicleService:VehicleServiceService,
  private userService:UserServiceService,
  private toastr: ToastrService) {}

  ngOnInit(){
    this.vehicleEdittForm = new FormGroup({
     model:new FormControl(this.payload.model,[Validators.required]),
     registration_number:new FormControl(this.payload.registration_number,[Validators.required]),
     type:new FormControl(this.payload.type,[Validators.required]),
  });
  }

  onSubmit(){
    return this.vehicleService.editVehicle(this.payload._id,this.vehicleEdittForm.value).subscribe(resultat=>{
      if(!resultat){
        this.toastr.error('oops! something went wrong', 'Error');
        this.activeModal.close('Close click');
      }else {
        this.toastr.success('Vehicle updated successfuly!', 'Success');
        this.activeModal.close('Close click');
      }
    })
  }
}

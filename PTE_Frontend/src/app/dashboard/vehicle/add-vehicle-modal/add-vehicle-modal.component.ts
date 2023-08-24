import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';

@Component({
  selector: 'app-add-vehicle-modal',
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.scss'],
  providers: [ToastrService],
})
export class AddVehicleModalComponent {
  vehicleAddForm!: FormGroup


  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehicleService:VehicleServiceService,
    private userService:UserServiceService,
    private toastr: ToastrService) {}
  
    ngOnInit(){
      this.vehicleAddForm = new FormGroup({
       model:new FormControl('',[Validators.required]),
       registration_number:new FormControl('',[Validators.required]),
       type:new FormControl('',[Validators.required]),
    });
    }
  
    onSubmit(vehicleEdittForm:FormGroup){
      return this.vehicleService.addVehicle(this.vehicleAddForm.value).subscribe(resultat=>{
        if (resultat.errors){
          this.toastr.error('oops! something went wrong', 'Error');
          this.activeModal.close('Close click');
        }else {
          this.toastr.success('Vehicle added successfuly!', 'Success');
          this.activeModal.close('Close click');

        }
      })
    }
}

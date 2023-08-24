import { Component, TemplateRef, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { VehicleEvent } from 'src/app/core/models/vehicleEvent';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder,
  UntypedFormGroup,
  Validators,} from '@angular/forms';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { VehicleServiceService } from 'src/app/core/service/vehicle-service.service';
import { Vehicle } from 'src/app/core/models/vehicle';
import Swal from 'sweetalert2';
import { EditVehicleModalComponent } from './edit-vehicle-modal/edit-vehicle-modal.component';
import { AddVehicleModalComponent } from './add-vehicle-modal/add-vehicle-modal.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInfoModalComponent } from './event-info-modal/event-info-modal.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: [ToastrService],

})
export class VehicleComponent {
  @ViewChild('calendar', { static: false })
  dialogTitle!: string
  isEditClick?: boolean;
  vehicleEventForm!: UntypedFormGroup;
  vehicleEvent!: VehicleEvent | null;
  eventWindow?: TemplateRef<any>;
  calendarData!: VehicleEvent;
  calendarEvents!: EventInput[];
  vehicles!:Vehicle[]
  showCalendar!: boolean;
  selectedVehicle!:Vehicle 
  Events: any[]=[];
  tempEvents: any[]=[];

  constructor(
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private vehicleService:VehicleServiceService
  ) {
    this.dialogTitle = 'Add New Event';
    // this.vehicleEventForm =new vehicleEvent("","",new Date,new Date,"","","",true)
    
  }
  public ngOnInit(): void {
    this.showCalendar==false
    // this.calendarEvents = INITIAL_EVENTS;
    // this.tempEvents = this.calendarEvents;
    // this.calendarOptions.initialEvents = this.calendarEvents;
    this.getVehicles()
  }
  ToggleCalendar(vehicle: Vehicle) {
    if (!this.showCalendar) {
      this.showCalendar = true
      this.selectedVehicle=vehicle
    }
    else {
      this.showCalendar = false
      this.showCalendar = true
      this.selectedVehicle=vehicle
    }
  }
  deleteVehicle(vehicleID:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({title:'Deleted!',text: 'Vehicle has been deleted.',icon:'success',confirmButtonColor: '#47A992',});
      this.vehicleService.deleteVehicle(vehicleID).subscribe(resultat => {
        this.vehicles = this.vehicles.filter(r => r._id !== vehicleID);
         console.log(resultat)
      })
  }else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    Swal.fire({
      title:'Cancelled',
      text:'Vehicle is safe :)',
      icon:'warning',
      confirmButtonColor: '#47A992',
    }
    )
  }
})}

    editVehicleWindowCall(vehicle:Vehicle) {
      const modalRef: NgbModalRef = this.modalService.open(EditVehicleModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        keyboard: false ,
        backdropClass:'light-blue-backdrop'
      });
      modalRef.componentInstance.payload=vehicle
    }
  
  

  

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    eventClick: (info) => {
      // Get the clicked event's information
      const event = {
        id: info.event.id,
        driver: info.event.extendedProps['driver'],
        applicant: info.event.extendedProps['applicant'],
        vehicle: info.event.extendedProps['vehicle'],
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
      }
      // Display the event information using a dialog
      const modalRef = this.modalService.open(EventInfoModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        keyboard: false,
        backdropClass: 'light-blue-backdrop'
      });
      modalRef.componentInstance.calendar = this.calendarComponent.getApi();

    },
    events: (info, successCallback, failureCallback) => {
      this.vehicleService.getVehicleEvents(this.selectedVehicle._id).subscribe(resultat => {
        //console.log("RES",resultat)
        this.Events = resultat as any
        this.Events.forEach(event => {
          let vehicleEvents = {
            id: event._id,
            title: event.title,
            start: event.start,
            end: event.end,
            vehicle: this.selectedVehicle._id,
            driver: event.driver,
            applicant: event.applicant,
            destination: event.destination
          }
          this.tempEvents.push(vehicleEvents);
        })
      })
      console.log(this.tempEvents)
    },
    dateClick: (info) => {
      const modalRef = this.modalService.open(AddEventModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        keyboard: false,
        backdropClass: 'light-blue-backdrop'
      });
      modalRef.componentInstance.data = info.dateStr
      modalRef.componentInstance.vehicle = this.selectedVehicle
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  onVehicleClick() {
    
    this.ToggleCalendar(this.selectedVehicle)
    this.calendarOptions.events = (info, successCallback, failureCallback) => {
      const start = info.startStr;
      const end = info.endStr;
  
      this.vehicleService.getVehicleEvents(this.selectedVehicle._id).subscribe(
        ({ acceptedEvents, rejectedEvents }: any) => {
          const eventInputs: EventInput[] = [
            ...acceptedEvents.map((event: any) => ({ ...event, color: 'green', extendedProps: { isAccepted: true } })),
            ...rejectedEvents.map((event: any) => ({ ...event, color: 'red', extendedProps: { isAccepted: false } })),
          ];
  
          successCallback(eventInputs);
        },
        (error) => {
          failureCallback(error);
        }
      );
    };
  }


  handleEvents(events: EventApi[]) {
     //this.currentEvents = events;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const data = selectInfo.startStr;
    //console.log(data)
    this.eventWindowCall(data);
  }
  handleEventClick(clickInfo: EventClickArg) {
    //this.eventWindowCall(clickInfo, 'addEvent');
  }
  eventWindowCall(data:string) {
    // const modalRef: NgbModalRef = this.modalService.open(AddEventModalComponent, {
    //   ariaLabelledBy: 'modal-basic-title',
    //   size: 'lg',
    //   keyboard: false ,
    //   backdropClass:'light-blue-backdrop'
    // });
    // modalRef.componentInstance.title="Add event"
    // modalRef.componentInstance.data=data
    //console.log(data)
  }
  @ViewChild('calendar') calendarComponent!:FullCalendarComponent ;
  addVehicleWindowCall() {
    const modalRef: NgbModalRef = this.modalService.open(AddVehicleModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      keyboard: false ,
      backdropClass:'light-blue-backdrop'
    });
    modalRef.componentInstance.title="Add Vehicle"
    
  }

  // eventWindowCall(){
  //   const modalRef: NgbModalRef = this.modalService.open(AddEventModalComponent, {
  //     keyboard: false ,
  //     backdropClass:'light-blue-backdrop'
  //   });
    
  // }

  createCalendarForm(vehicleEvent: VehicleEvent): UntypedFormGroup {
    return this.fb.group({
      title: [vehicleEvent.title, [Validators.required]],
      start: [vehicleEvent.start, [Validators.required]],
      end: [vehicleEvent.end, [Validators.required]],
      destination: [vehicleEvent.destination,[Validators.required]],
      driver:[vehicleEvent.driver,[Validators.required]],
      vehicle:[vehicleEvent.vehicle,[Validators.required]],
      isAccepted:true
    });
  }

  getVehicles(){
    return this.vehicleService.getVehicles().subscribe(resultat => {
      this.vehicles=resultat as Vehicle[]
       console.log(this.vehicles)
    })
  }

  // saveEvent(form: UntypedFormGroup) {
  //   this.calendarData = form.value;
  //   this.calendarEvents = this.calendarEvents.concat({
  //     title: this.calendarData.title,
  //     start: this.calendarData.startDate,
  //     end: this.calendarData.endDate,
  //     vehicle:this.calendarData.title,
  //     driver:this.calendarData.title,
  //     destination:this.calendarData.title,
  //     applicant:this.calendarData.title,
  //   });
  //   this.calendarOptions.events = this.calendarEvents;
  //   this.vehicleEventForm.reset();
  //   this.modalService.dismissAll();

  //   this.showNotification(
  //     'success',
  //     'Save Event Successfully...!!!',
  //     'top',
  //     'right'
  //   );
  // }

  // eventClick(form: UntypedFormGroup) {
  //   this.calendarData = form.value;

  //   this.calendarEvents.forEach((element, index) => {
  //     if (this.calendarData.id === element.id) {
  //       this.saveEditEvent(index, this.calendarData);
  //     }
  //   }, this);
  // }
  showNotification(
    eventType: string,
    message: string,
    ypos: string,
    xpos: string
  ) {
    if (eventType === 'success') {
      this.toastr.success(message, '', {
        positionClass: 'toast-' + ypos + '-' + xpos,
      });
    }
  }
  // saveEditEvent(eventIndex: number, calendarData: any) {
  //   const calendarEvents = this.calendarEvents.slice();
  //   const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
  //   singleEvent.id = calendarData.id;
  //   singleEvent.title = calendarData.title;
  //   singleEvent.start = calendarData.startDate;
  //   singleEvent.end = calendarData.endDate;
  //   singleEvent.groupId = calendarData.category;
  //   singleEvent['details'] = calendarData.details;
  //   calendarEvents[eventIndex] = singleEvent;
  //   this.calendarEvents = calendarEvents; // reassign the array

  //   this.calendarOptions.events = calendarEvents;

  //   this.vehicleEventForm.reset();
  //   this.modalService.dismissAll();

  //   this.showNotification(
  //     'success',
  //     'Edit Event Successfully...!!!',
  //     'top',
  //     'right'
  //   );
  // }

}

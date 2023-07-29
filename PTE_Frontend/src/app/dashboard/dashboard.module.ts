import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeModule } from 'ngx-gauge';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserDetailsComponent } from './user-list/user-details/user-details.component';
import { RoomComponent } from './room/room.component';
import { ToolComponent } from './tool/tool.component';
import { TechnicianComponent } from './technician/technician.component';
import { VirtualisationEnvironmentComponent } from './virtualisation-environment/virtualisation-environment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventModalComponent } from './vehicle/add-event-modal/add-event-modal.component';
import { EditVehicleModalComponent } from './vehicle/edit-vehicle-modal/edit-vehicle-modal.component';

@NgModule({
  declarations: [MainComponent, Dashboard2Component, UserListComponent, UserRequestComponent, UserDetailsComponent, RoomComponent, ToolComponent, TechnicianComponent, VirtualisationEnvironmentComponent, VehicleComponent, AddEventModalComponent, EditVehicleModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    NgApexchartsModule,
    NgbProgressbarModule,
    NgxGaugeModule,
    FullCalendarModule,
    ReactiveFormsModule
  ],
})
export class DashboardModule {}

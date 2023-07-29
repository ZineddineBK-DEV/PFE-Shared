import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { RoomComponent } from './room/room.component';
import { ToolComponent } from './tool/tool.component';
import { TechnicianComponent } from './technician/technician.component';
import { VirtualisationEnvironmentComponent } from './virtualisation-environment/virtualisation-environment.component';
import { VehicleComponent } from './vehicle/vehicle.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'userList',
    component: UserListComponent,
  },
  {
    path: 'userRequest',
    component: UserRequestComponent,
  },
  {
    path: 'vehicle',
    component: VehicleComponent,
  },
  {
    path: 'room',
    component: RoomComponent,
  },
  {
    path: 'tool',
    component: ToolComponent,
  },
  {
    path: 'technician',
    component: TechnicianComponent,
  },
  {
    path: 'virt-env',
    component: VirtualisationEnvironmentComponent,
  },
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

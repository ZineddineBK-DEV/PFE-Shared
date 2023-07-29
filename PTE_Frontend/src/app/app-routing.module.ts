import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { Page404Component } from './authentication/page404/page404.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  //{ path: "**", component: Page404Component },
];



// const routes: Routes = [
   
//   {path:'', component:AppComponent},
//   /*auth routes*/
//   {path:'signin', component:SigninComponent},
//   {path:'signup', component:SignupComponent},
//   /*user management routes*/
//   {path:'registerRequest' , component:UserRequestsComponent},
//   {path:'employeesList' , component:UserListComponent},
//   // {path:'externalEmployeesList' , component:ExternalEmployeesListComponent},
//   // {path:'actionPlan' , component:ActionPlanComponent},
//   // /*resources booking routes*/
//   // {path:'environementLabs' , component:EnvironementLabsComponent},
//   // {path:'vehicle' , component:VehiclesComponent},
//   // {path:'conferenceRoom' , component:ConferenceRommsComponent},
//   // {path:'technicalTeam' , component:TechnicalTeamComponent},
//   // {path:'teamOrganizationalChart' , component:TeamorganizationalChartComponent},
// ];




@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

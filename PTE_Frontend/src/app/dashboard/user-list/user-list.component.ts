import { Component, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { User } from 'src/app/core/models/user';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import Swal from 'sweetalert2';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  rows: User[] = [];
  temp: User[] = [];
  loadingIndicator! :boolean
  reorderable = true;
  SortType = SortType;
  scrollBarHorizontal = window.innerWidth < 1200;
  users!: User[];
  employeesCount!:number
  user!:User;

  @ViewChild('table') table!: DatatableComponent;

  constructor(public userService:UserServiceService,private modalService: NgbModal) {}

  ngOnInit(): void {  
    this.loadingIndicator = true
    this.userService.getEmployees().subscribe(resultat=>{
      this.rows = resultat as User[];
      this.temp = resultat;
      this.employeesCount = this.rows.length;
      this.loadingIndicator = false
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  getRowHeight(row: any) {
    return row.height;
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || 
             d.lastName.toLowerCase().indexOf(val) !== -1 || 
             d.email.toLowerCase().indexOf(val) !== -1 || 
             d.departement.toLowerCase().indexOf(val) !== -1 || 
             d.isEnabled.toLowerCase()===val || 
             !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  deleteUser(userID: string) {
    
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
        Swal.fire({title:'Deleted!',text: 'User has been deleted.',icon:'success',confirmButtonColor: '#47A992',});
        this.userService.declineUserRequest(userID).subscribe(resultat => {
        this.loadingIndicator==true
        this.rows = this.rows.filter(row => row._id !== userID);
        })
        this.loadingIndicator=false
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title:'Cancelled',
          text:'User is safe :)',
          icon:'warning',
          confirmButtonColor: '#47A992',
        }
        )
      }
    })
  }
  showUserDetailsModal(user:User){
    const modalRef: NgbModalRef = this.modalService.open(UserDetailsComponent, {
      keyboard: false ,
      backdropClass:'light-blue-backdrop'
    });
    modalRef.componentInstance.payload=user
    modalRef.componentInstance.title="User details"
    this.user=user
  }
}

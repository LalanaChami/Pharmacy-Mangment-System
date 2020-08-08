import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthDoctorUserService } from 'src/app/auth/doctorAuth/authDoctorUser.service';

@Component({
  selector: 'app-manage-doctor-account',
  templateUrl: './manage-doctor-account.component.html',
  styleUrls: ['./manage-doctor-account.component.css']
})
export class ManageDoctorAccountComponent implements OnInit {

  searchTerm : string;
  doctors = [];
  isLoading= false;
  userIsAuthenticated = false;
   userSubs: Subscription;
   password = false;


  constructor( private authDoctorUserService:AuthDoctorUserService){}


  ngOnInit() {
    this.isLoading = true;
    this.authDoctorUserService.getDoctorData();
    this.userSubs = this.authDoctorUserService.getDoctorUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.doctors = posts;
      });
  }

  onDelete(id:string){
    this.authDoctorUserService.deleteUser(id);
  }

}

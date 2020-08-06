import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header-userdetails',
  templateUrl: './header-userdetails.component.html',
  styleUrls: ['./header-userdetails.component.css']
})
export class HeaderUserdetailsComponent implements OnInit {

  userIsAuthenticated =false;
  private authListenerSubs: Subscription;
  email:string;
  role: string;
  UserRole = false;
  ApharmacistRole = false;
  CashierRole = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });


    this.role = this.authService.getUserRole();
    console.log(this.role);
    if(this.role === "pharmacist"){
      this.UserRole = true;
    }
    if(this.role === "cashier"){
      this.CashierRole = true;
    }
    if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }


  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onViewUserEmail(email:string){
    this.email = email;
  }

}

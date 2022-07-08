import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent implements OnInit {
  PharamacistRole = false;
  ApharmacistRole = false;
  CashierRole = false;
  role: string;

  userIsAuthenticated =false;
  private authListenerSubs: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });

    this.role = this.authService.getUserRole();
    console.log(this.role);
    /*if(this.role === "pharmacist"){ //variables not being set upon page reload
      this.PharamacistRole = true;
    }
    else if(this.role === "cashier"){
      this.CashierRole = true;
    }
    else if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }*/
    this.PharamacistRole = true; //for our workflow we don't need to worry about other users for now


  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}

import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-taskbar',
  templateUrl: './header-taskbar.component.html',
  styleUrls: ['./header-taskbar.component.css']
})
export class HeaderTaskbarComponent implements OnInit, OnDestroy {
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
    if(this.role === "pharmacist"){
      this.PharamacistRole = true;
    }
    else if(this.role === "cashier"){
      this.CashierRole = true;
    }
    else if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}

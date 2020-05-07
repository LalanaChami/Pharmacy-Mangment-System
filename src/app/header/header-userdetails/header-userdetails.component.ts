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

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}

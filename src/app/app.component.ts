import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pro';
  showMenu = true;
  showSignup =true;
  showShoppingcart = true;
  showDoctorLogin =true;
  showDoctorSignup =true;
  constructor(router:Router, private authService : AuthService) {

    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showMenu = event.url !== "/login";

        }
        if(event instanceof NavigationStart){
          this.showSignup = event.url !== "/signup";
        }
        if(event instanceof NavigationStart){
          this.showShoppingcart = event.url !== "/shoppingcart";
        }
        if(event instanceof NavigationStart){
          this.showDoctorLogin = event.url !== "/doctorLogin";
        }
        if(event instanceof NavigationStart){
          this.showDoctorSignup = event.url !== "/doctorSignup";
        }
      });
    }
    ngOnInit(){
      this.authService.autoAuthUser();
    }


}

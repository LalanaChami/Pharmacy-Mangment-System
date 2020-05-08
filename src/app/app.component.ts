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
  constructor(router:Router, private authService : AuthService) {

    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showMenu = event.url !== "/login";

        }
        if(event instanceof NavigationStart){
          this.showSignup = event.url !== "/signup";
        }
      });
    }
    ngOnInit(){
      this.authService.autoAuthUser();
    }


}

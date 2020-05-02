import { Router, NavigationStart } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pro';
  showMenu = true;
  showSignup =true;
  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showMenu = event.url !== "/login";

        }
        if(event instanceof NavigationStart){
          this.showSignup = event.url !== "/signup";
        }
      });
    }

}

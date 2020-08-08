import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-assistant-pharmasist-account',
  templateUrl: './manage-assistant-pharmasist-account.component.html',
  styleUrls: ['./manage-assistant-pharmasist-account.component.css']
})
export class ManageAssistantPharmasistAccountComponent implements OnInit {

  searchTerm : string;
  users = [];
  isLoading= false;
  userIsAuthenticated = false;
   userSubs: Subscription;


  constructor( private authService: AuthService){}


  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser();
    this.userSubs = this.authService.getUserUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.users = posts;
      });
  }

  onDelete(userId:string){
    this.authService.deleteUser(userId);
  }

}

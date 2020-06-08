import { AuthDoctorData } from './../../../../auth/doctorAuth/doctorAuth-model';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { NgForm } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../inventory.model';
import { SalesInformationArray } from 'src/app/mainwindow/a-pointofsale-window/salesInformationArray.model';


@Component({
  selector: 'app-a-shopping-cart-items',
  templateUrl: './a-shopping-cart-items.component.html',
  styleUrls: ['./a-shopping-cart-items.component.css']
})
export class AShoppingCartItemsComponent implements OnInit {
  email2: string;
  searchTerm: string;
  inventorys: Inventory[] = [];
  itemArray: Array<any> =[];
  isLoading= false;
  currentPage= 1;
  totalItems= 10;
  total : number;
  itemsPerPage = 8;
  pageSizeOptions =[8,12,16,20,24];
  private inventorySubs: Subscription;
  itemNumber: number;
  dataArray: Array<any> =[];
  details: AuthDoctorData;

  name: string;

  constructor(private inventoryInteractionService: InventoryInteractionService, private authDoctorUserService:AuthDoctorUserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

      // this.authDoctorUserService.profile().subscribe(user => {
      //   this.details = user;
      // }, (err) => {
      //   console.error(err);
      // });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage= pageData.pageIndex + 1;
    this.itemsPerPage=  pageData.pageSize;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

  onAddToCart(itemId:string, name:string , expireDate:string ,price:string, form:NgForm ,imagePath:string ){
    this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber,imagePath]);
    // this.dataArray.push([name,form.value.quantityNumber]);
    console.log(this.itemArray);
    this.itemNumber = this.itemArray.length;

    let length = this.itemArray.length;
    let x ;
    let z ;
    let sum;
    this.total = 0;

    for (let count = 0 ; count < length; count++) {
       x = this.itemArray[count][3];

       z = this.itemArray[count][4];
       sum = +x * +z ;

       this.total = this.total + sum;


    }

  //  console.log(this.dataArray);


    return this.total;
  }

  onViewUserEmail(email:string){
    this.email2 = email;
    this.name ="hjhvjhvhjvjh";
    console.log(this.email2);

    // this.authDoctorUserService.getDoctors(this.email);

  }
  onLogout(){
    this.authDoctorUserService.logout();
  }



}

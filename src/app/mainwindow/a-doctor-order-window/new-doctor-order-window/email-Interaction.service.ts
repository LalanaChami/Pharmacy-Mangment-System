import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class EmailInteractionService{

  constructor(private http: HttpClient) {}
  httpGet(url) {
    return this.http.get(url);
  }

  httpPost(url, {}) {
    return this.http.post(url, { name: "Email Server" });
  }

  sendEmail(url, data) {
    return this.http.post(url, data);
  }

  expiredDialog(){

  }

}

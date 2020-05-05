import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService :AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler  ){
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers:  req.headers.set("authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}

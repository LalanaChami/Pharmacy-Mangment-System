import { CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
              state: import("@angular/router").RouterStateSnapshot
              ): boolean | import("@angular/router").UrlTree | import("rxjs")
              .Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
                const isAuth = this.authService.getIsAuth();
                if(!isAuth){
                  this.router.navigate(['/login']);
                }
                return isAuth;
              }

}

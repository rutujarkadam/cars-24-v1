import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service : CarsService,private router : Router){}
  canActivate(  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     if (this.service.isLoggedIn()) {
      const userType = this.service.getType();
      if (userType == 'admin' && state.url == '/admin') {
        // this.router.navigateByUrl('admin');
        return true;
      } else if (userType == 'user' && state.url == '/dashboard') {
        // this.router.navigateByUrl('dashboard');
        return true;
      }
    }
    alert('You have to login!');
    this.router.navigateByUrl('');
    return false;
  }    
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}
  getCarsOptions() {
    const url = 'http://localhost:3000/getCarsOptions';
    return this.http.get(url);
  }
  postCarInfo(body: any) {
    const url = 'http://localhost:3000/postCarInfo';
    return this.http.post(url, body);
  }
  getCarInfo() {
    const url = 'http://localhost:3000/getCarInfo';
    return this.http.get(url);
  }

  postUsers(body: any) {
    const url = 'http://localhost:3000/registerUser';
    return this.http.post(url, body);
  }
  getUser(body:any) {
    const url = 'http://localhost:3000/login';
    return this.http.post(url, body);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  getType(){
    return localStorage.getItem('userType');
  }
  createCoupon(body:any){
    const url = 'http://localhost:3000/createCoupon';
    return this.http.post(url, body);
  }
  getAllCoupons(){
    return this.http.get('http://localhost:3000/getAllCoupons')
  }
  deleteCoupon(id:any){
    const url = 'http://localhost:3000/deleteCoupons/'+id.toString();
    return this.http.delete(url);
  }
}

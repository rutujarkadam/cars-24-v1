import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http : HttpClient) { }
  getCarsOptions(){
    const url = 'http://localhost:3000/getCarsOptions';
    return this.http.get(url);
  }
  postCarInfo(body:any){
    const url = 'http://localhost:3000/postCarInfo';
    return this.http.post(url,body);
  }
  getCarInfo(){
    const url = 'http://localhost:3000/getCarInfo';
    return this.http.get(url);
  }
}

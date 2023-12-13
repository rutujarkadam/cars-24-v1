import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  encryptSecretKey = 'sdhfhhjrhjkhrireirohriegihgdfjgkdgjrekhru';
  token:any;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, 
    private service : CarsService,
    private router : Router, 
    private toastr : ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    let body = {
      username : this.loginForm.controls['username'].value,
      password : this.loginForm.controls['password'].value
    }
    this.service.getUser(body).subscribe((res:any)=> {
      console.log('success',res);
      localStorage.setItem('token',res.token);
      localStorage.setItem('userType',res.type);
      if (res.type == 'admin') {
        this.router.navigateByUrl('admin');
      } else if (res.type == 'user') {
        this.router.navigateByUrl('dashboard');
      };
      this.toastr.info(res.data);
    }, error => {
      console.log('error',error);
    });
  }
  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.encryptSecretKey
      ).toString();
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

// logic for decryptdata
// decryptData(data) {

//   try {
//     const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
//     if (bytes.toString()) {
//       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     }
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }

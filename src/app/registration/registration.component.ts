import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hide1: boolean = true;
  hide2: boolean = true;
  registrationForm: FormGroup;
  encryptSecretKey = 'sdhfhhjrhjkhrireirohriegihgdfjgkdgjrekhru';
  gender = ['male', 'female'];
  type = ['admin', 'user'];
  registredInfo: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CarsService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      gender: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit() {}
  submitdata() {
    
    if (
      this.registrationForm.value.password ==
      this.registrationForm.value.confirmPassword
    ) {
      this.registrationForm.value.encryptedPass = 
        this.registrationForm.value.password;
      let body = {
        username: this.registrationForm.controls['username'].value,
        password: this.registrationForm.value.encryptedPass,
        confirmPassword: this.registrationForm.controls['confirmPassword'].value,
        emailId: this.registrationForm.controls['emailId'].value,
        gender: this.registrationForm.controls['gender'].value,
        type : this.registrationForm.controls['type'].value
      };
      console.log(this.registrationForm.value);
      this.service.postUsers(body).subscribe(
        (res: any) => {
          console.log('success', res);
        },
        (error) => {
          console.log('fail', error);
        }
      );
      this.router.navigateByUrl('');
      this.toastr.success("Registration successful.")

    } else {
      this.toastr.error('Password and Confirmpassword does not match');
    }

    // const userType = this.registrationForm.controls['type'].value;
    // if (userType === 'user') {
    //   this.router.navigateByUrl('/login');
    // } else {
    //   this.router.navigateByUrl('/admin');
    // }

  }
  pass() {
    this.hide1 = !this.hide1;
  }
  Confirmpass() {
    this.hide2 = !this.hide2;
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

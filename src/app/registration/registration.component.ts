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
  userData: any = [];
  registrationForm: FormGroup;
  encryptSecretKey = 'sdhfhhjrhjkhrireirohriegihgdfjgkdgjrekhru';
  gender = ['male', 'female'];
  type = ['Admin', 'User'];
  registredInfo: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CarsService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
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
      this.registrationForm.value.password = this.encryptData(
        this.registrationForm.value.password
      );
      delete this.registrationForm.value.confirmPassword;
      console.log(this.registrationForm.value);
      this.userData.push(this.registrationForm.value);
      console.log('data', this.userData);

      this.registrationForm.reset();
      this.router.navigateByUrl('/login');
      this.toastr.success('login sucessfully');
    } else {
      this.toastr.error('password and confirmpassword does not match');
    }

    const userType = this.registrationForm.controls['type'].value;
    // if (userType === 'user') {
    //   this.router.navigateByUrl('/login');
    // } else {
    //   this.router.navigateByUrl('/admin');
    // }

    let userdata = {
      username: String,
      password: String,
      confirmPassword: String,
      emailId: String,
      gender: String,
    };
    this.service.postUsers(userdata).subscribe(
      (res: any) => {
        this.registredInfo = res;
        console.log('success', res);
      },
      (error) => {
        console.log('fail', error);
      }
    );
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

import { Component } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

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

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      emailId: ['', Validators.required],
    });

    const data = localStorage.getItem('users');
    if (data) this.userData = JSON.parse(data);
  }
  ngOnInit() {
    this.encryptData('hhhhhhhh');
  }
  submitdata() {
    console.log(this.registrationForm.value);
    this.userData.push(this.registrationForm.value);
    console.log('ppp', this.userData);
    localStorage.setItem('users', JSON.stringify(this.userData));
    this.registrationForm.reset();
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
      return e;
      console.log(e);
    }
  }
}

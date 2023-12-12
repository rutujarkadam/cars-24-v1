import { Component } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {}
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

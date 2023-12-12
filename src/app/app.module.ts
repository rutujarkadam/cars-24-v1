import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AdminComponent, DashboardComponent],
=======
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, AdminComponent, LoginComponent],
>>>>>>> 55f0d24cb77358e122d578341a5e35d1055a4766
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
<<<<<<< HEAD
    FormsModule,
=======
>>>>>>> 55f0d24cb77358e122d578341a5e35d1055a4766
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

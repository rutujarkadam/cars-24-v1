import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {
newCoupon : FormGroup;
coupons = false;
allCoupons:any;
displayedColumns:any = ['couponCode','couponPercentage','delete']
constructor(private fb : FormBuilder,
  private service: CarsService,
  private toastr : ToastrService){
  this.newCoupon  = this.fb.group({
    couponCode : ['',Validators.required],
    couponPercentage : ['', Validators.required]
  });
}
createCoupon(){
  let body = {
    couponCode : this.newCoupon.value.couponCode,
    discount : this.newCoupon.value.couponPercentage
  };
  this.service.createCoupon(body).subscribe((res:any) => {
    console.log('success',res);
    this.toastr.success(res.message);
    this.newCoupon.reset();
  }, error => {
    console.log('error', error);
    this.toastr.warning(error);
  });
}
showAllCoupons(){
  this.service.getAllCoupons().subscribe((res:any)=>{
    this.allCoupons = res.data;
    console.log(res);
    this.coupons = true;
  },error => {
    console.group('error',error)
  });
}
deleteCoupon(id:any){
  this.service.deleteCoupon(id).subscribe((res:any)=> {
    console.log('deleted', res);
    this.toastr.success(res.message);
    this.showAllCoupons();
  },error => {
    console.log('error',error);
  });
}
back(){
  this.coupons = false;
}
}

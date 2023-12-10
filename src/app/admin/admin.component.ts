import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  carsOptions:any;
  brandList:any;
  modelOptions:any = [];
  carDetailsForm : FormGroup;
constructor(private serive : CarsService, private fb : FormBuilder){
  this.carDetailsForm = this.fb.group({
    brand : ['',Validators.required],
    model : ['',Validators.required],
    makeYear : ['',Validators.required],
    variant: ['',Validators.required],
    kmDriven: ['',Validators.required],
    features: ['',Validators.required],
    transmission: ['',Validators.required],
    bodyType: ['',Validators.required],
    color: ['',Validators.required],
    seats: ['',Validators.required],
    owner: ['',Validators.required],
    state: ['',Validators.required],
    stateCode: ['',Validators.required],
    city: ['',Validators.required],
    price: ['',Validators.required],
  });
  
}
ngOnInit(){
  this.serive.getCarsOptions().subscribe((res:any) => {
    this.carsOptions = res.data;
    this.brandList = res.data[0].brandList;
    console.log("Options",res.data);
  }, error => {
    console.error(error);
  });
  
}
onCarBrandSelect() {
  let modelList:any=[];
  this.brandList.forEach((item:any)=>{
    if(item.brand==this.carDetailsForm.controls['brand'].value){
      modelList=item.models     
    }
  });
  this.modelOptions = modelList;
}
save(){

}
}

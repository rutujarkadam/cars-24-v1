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
  modelOptions:any;
  carDetailsForm : FormGroup;
codeOptions: any;
constructor(private service : CarsService, private fb : FormBuilder){
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
  this.service.getCarsOptions().subscribe((res:any) => {
    this.carsOptions = res.data;
    console.log("Options",res.data);
  }, error => {
    console.error(error);
  });
  
}
onCarBrandSelect() {
  let modelList:any=[];
  this.carsOptions[0].brandList.forEach((item:any)=>{
    if(item.brand==this.carDetailsForm.controls['brand'].value){
      modelList=item.models     
    }
  });
  this.modelOptions = modelList;
}
onStateSelect(){
  let codes:any = [];
  this.carsOptions[0].states.forEach((item:any) => {
    if(item.state == this.carDetailsForm.controls['state'].value){
      codes=item.codes;
    }
  });
  this.codeOptions = codes;
}
add(){
  let data = this.carDetailsForm.value;
let body = {
  brand: data.brand,
  model: data.model,
  makeYear: data.makeYear,
  variant: data.variant,
  kmDriven: data.kmDriven,
  features: data.features,
  transmission: data.transmission,
  bodyType: data.bodyType,
  color: data.color,
  seats: data.seats,
  owner: data.owner,
  state: data.state,
  stateCode: data.stateCode,
  city: data.city,
  price: data.price,
};
this.service.postCarInfo(body);
this.carDetailsForm.reset;
}


}

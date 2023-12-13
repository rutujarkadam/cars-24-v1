import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CarsService } from '../cars.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  modelOptions: any;
  carsOptions: any;
  codeOptions: any;

  filterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CarsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<FilterComponent>
  ) {
    this.filterForm = this.fb.group({
      brand: [''],
      model: [''],
      makeYear: [''],
      variant: [''],
      kmDriven: [''],
      features: [''],
      transmission: [''],
      bodyType: [''],
      color: [''],
      seats: [''],
      owner: [''],
      state: [''],
      stateCode: [''],
      city: [''],
      price: [''],
    });
  }
  ngOnInit() {
    this.service.getCarsOptions().subscribe(
      (res: any) => {
        this.carsOptions = res.data;
        console.log('Options', res.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCarBrandSelect() {
    let modelList: any = [];
    this.carsOptions[0].brandList.forEach((item: any) => {
      if (item.brand == this.filterForm.controls['brand'].value) {
        modelList = item.models;
      }
    });
    this.modelOptions = modelList;
  }
  onStateSelect() {
    let codes: any = [];
    this.carsOptions[0].states.forEach((item: any) => {
      if (item.state == this.filterForm.controls['state'].value) {
        codes = item.codes;
      }
    });
    this.codeOptions = codes;
  }
  filterdata() {
    this.dialogRef.close(this.filterForm.value);
  }
}

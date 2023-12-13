import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { SortComponent } from '../sort/sort.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  search: any;
  carsFilterData: any = [];
  allcar: any = [];
  cararray: any = [];
  constructor(private service: CarsService, private sort: MatDialog) {}
  ngOnInit() {
    this.service.getCarInfo().subscribe(
      (res: any) => {
        this.allcar = res.data;
        this.carsFilterData = this.allcar;
        console.log('dashboardcarsucessed', res);
      },
      (error) => {
        console.log('dashboardFailed', error);
      }
    );
  }
  getFilterData() {}
  filterCarData(result: any) {}
  getSortData() {
    const dialogRef = this.sort.open(SortComponent, {
      width: '50',
      height: '70',
      data: { name: 'data' },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log('sort  was closed', res);
      this.sortData(res);
    });
  }
  sortData(argument: any) {
    if (argument == 'priceLowToHigh') {
      this.allcar.sort(function (a: any, b: any) {
        return a.price - b.price;
      });
    }
    if (argument == 'priceHighToLow') {
      this.allcar.sort(function (a: any, b: any) {
        return b.price - a.price;
      });
    }
    if (argument == 'ageNew') {
      this.allcar.sort(function (a: any, b: any) {
        return a.makeYear - b.makeYear;
      });
    }
    if (argument == 'ageOld') {
      this.allcar.sort(function (a: any, b: any) {
        return b.makeYear - a.makeYear;
      });
    }
    // if (argument == 'kmHigh') {
    //   this.allcar.sort(function (a: any, b: any) {
    //     return b.kmDriven - a.kmDriven;
    //   });
    // }
    // if (argument == 'kmLow') {
    //   this.allcar.sort(function (a: any, b: any) {
    //     return a.kmDriven - b.kmDriven;
    //   });
    // }
  }
  findCar() {
    // this.cararray = this.allcar.filter((item: any) => {
    //   if (
    //     item.brand.toLowerCase().includes(this.search.toLowerCase()) ||
    //     item.model.toLowerCase().includes(this.search.toLowerCase())
    //   ) {
    //     return item;
    //   }
    // });
  }
  Reset() {}
}

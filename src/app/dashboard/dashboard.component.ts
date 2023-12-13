import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { SortComponent } from '../sort/sort.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
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

  constructor(
    private service: CarsService,
    private sort: MatDialog,
    private dialog: MatDialog
  ) {}

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
  getFilterData() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '73%',
      height: '42%',
      panelClass: 'my-class',
      data: { name: 'Data' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.filterCarData(result);
    });
  }
  filterCarData(result: any) {
    this.allcar = this.carsFilterData;
    if (result.brand) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.brand == result.brand;
      });
    }
    if (result.model) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.model == result.model;
      });
    }
    if (result.makeYear) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.makeYear == result.makeYear;
      });
    }
    if (result.variant) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.variant == result.variant;
      });
    }
    if (result.kmDriven) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.kmDriven == result.kmDriven;
      });
    }
    if (result.features) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.features == result.features;
      });
    }
    if (result.transmission) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.transmission == result.transmission;
      });
    }
    if (result.state) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.state == result.state;
      });
    }
    if (result.stateCode) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.stateCode == result.stateCode;
      });
    }
    if (result.city) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.city == result.city;
      });
    }
    if (result.bodyType) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.bodyType == result.bodyType;
      });
    }
  }
  findCar() {
    this.cararray = this.allcar.filter((item: any) => {
      if (
        item.brand.toLowerCase().includes(this.search.toLowerCase()) ||
        item.model.toLowerCase().includes(this.search.toLowerCase())
      ) {
        return item;
      }
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

  Reset() {}
}

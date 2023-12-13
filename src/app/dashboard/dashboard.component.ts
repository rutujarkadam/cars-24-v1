import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
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
  constructor(private service: CarsService, private dialog: MatDialog) {}
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
  getFilterData() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '73%',
      height: '45%',
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
  }
  getSortData() {}
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
}

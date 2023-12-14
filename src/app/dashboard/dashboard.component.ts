import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortComponent } from '../sort/sort.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
import { VariableConstants } from '../variable.constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  discountPrice: any;
  discountOnMaruti = 10;
  // discountOnkiya = VariableConstants.KIYA_DISCOUNT;
  search: any;
  dicountPrice: any;
  carsFilterData: any = [];
  allcar: any = [];
  cararray: any = [];

  constructor(
    private service: CarsService,
    private sort: MatDialog,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
    const data = localStorage.getItem('car24');
    if (data) {
      this.bookArray = JSON.parse(data);
    }
  }

  ngOnInit() {
    this.service.getCarInfo().subscribe(
      (res: any) => {
        this.allcar = res.data;
        this.allCarDiscountPrice();
        this.carsFilterData = this.allcar;

        console.log('dashboardcarsucessed', res);
      },
      (error) => {
        console.log('dashboardFailed', error);
      }
    );
  }
  allCarDiscountPrice() {
    this.allcar.forEach((item: any) => {
      if (item.brand == VariableConstants.MARUTI_SUZUKI) {
        item.discountPrice = item.price - item.price * 0.1;
      } else if (item.brand == VariableConstants.Toyota) {
        item.discountPrice = item.price - item.price * 0.15;
      } else if (item.brand == VariableConstants.Kia) {
        item.discountPrice = item.price - item.price * 0.12;
      } else if (item.brand == VariableConstants.Hyundai) {
        item.discountPrice = item.price - item.price * 0.13;
      } else if (item.brand == VariableConstants.Honda) {
        item.discountPrice = item.price - item.price * 0.16;
      } else if (item.brand == VariableConstants.Tata) {
        item.discountPrice = item.price - item.price * 0.15;
      } else if (item.brand == VariableConstants.Mahindra) {
        item.discountPrice = item.price - item.price * 0.12;
      } else if (item.brand == VariableConstants.Ford) {
        item.discountPrice = item.price - item.price * 0.1;
      } else if (item.brand == VariableConstants.Renault) {
        item.discountPrice = item.price - item.price * 0.14;
      } else if (item.brand == VariableConstants.Volkswagen) {
        item.discountPrice = item.price - item.price * 0.12;
      } else if (item.brand == VariableConstants.Chevrolet) {
        item.discountPrice = item.price - item.price * 0.17;
      } else if (item.brand == VariableConstants.Fiat) {
        item.discountPrice = item.price - item.price * 0.12;
      }
    });
  }
  getSortData() {
    const dialogRef = this.sort.open(SortComponent, {
      width: '60',
      height: '80',
      data: { name: 'data' },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log('sort  was closed', res);
      this.sortData(res);
    });
  }
  getFilterData() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '74%',
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
    if (result.color) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.color == result.color;
      });
    }
    if (result.seats) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.seats == result.seats;
      });
    }
    if (result.owner) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.owner == result.owner;
      });
    }
    if (result.price) {
      this.allcar = this.allcar.filter((item: any) => {
        return item.price == result.price;
      });
    }
  }
  findCar() {
    this.allcar = this.carsFilterData;
    this.allcar = this.allcar.filter((item: any) => {
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

  reset() {
    this.allcar = this.carsFilterData;
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigateByUrl('');
    this.toastr.success('Logged out.');
  }
  bookArray: any = [];
  allBookedCars(item: any) {
    let obj = {
      brand: item.brand,
      model: item.model,
      makeYear: item.makeYear,
      variant: item.variant,
      kmDriven: item.kmDriven,
      features: item.features,
      transmission: item.transmission,
      bodyType: item.bodyType,
      color: item.color,
      seats: item.seats,
      owner: item.owner,
      state: item.state,
      stateCode: item.stateCode,
      city: item.city,
      price: item.price,
      date: this.datePipe.transform(new Date(), 'MM/dd/yyyy h:mm:ss'),
    };
    if (this.bookArray.length > 0) {
      let exist = false;
      this.bookArray.forEach((element: any) => {
        if (element.brand == item.brand && element.model == item.model) {
          exist = true;
        }
      });
      if (!exist) {
        this.bookArray.push(obj);
        this.toastr.success('Car Booked Sucessfully');
      }
    } else {
      this.bookArray.push(obj);
      this.toastr.success('Car Booked Sucessfully');
    }
    localStorage.setItem('car24', JSON.stringify(this.bookArray));
    console.log(this.bookArray);
  }
}

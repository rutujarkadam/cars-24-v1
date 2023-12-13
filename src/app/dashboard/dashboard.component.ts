import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  search: any;
  allcar: any = [];
  cararray: any = [];
  constructor(private service: CarsService,
    private router : Router,
    private toastr : ToastrService    ) {}
  ngOnInit() {
    this.service.getCarInfo().subscribe(
      (res: any) => {
        this.allcar = res.data;
        console.log('dashboardcarsucessed', res);
      },
      (error) => {
        console.log('dashboardFailed', error);
      }
    );
  }
  getFilterData() {}
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





















































logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigateByUrl('');
    this.toastr.success('Logged out.')
  }
}

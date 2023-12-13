import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { SortComponent } from './sort/sort.component';
import { FilterComponent } from './filter/filter.component';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,canActivate : [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,canActivate : [AuthGuard]
  },

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'sort',
    component: SortComponent,
  },
  {
    path: 'filter',
    component: FilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlotListComponent } from './plots/list/list.component';
import { PlotsComponent } from './plots/plots.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportsComponent } from './reports/reports.component';
import { ListComponent } from './township/list/list.component';
import { TownshipComponent } from './township/township.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: RegistrationComponent },
  { path: 'township/view', component: TownshipComponent},
  { path: 'plots', component: PlotsComponent},
  { path: 'plots/view', component: PlotsComponent},
  { path: 'township/list', component: ListComponent },
  { path: 'plots/list', component: PlotListComponent },
  { path: 'reports/view', component: ReportsComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
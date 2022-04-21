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
  { path: '',  redirectTo: 'admin',pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: RegistrationComponent,canActivate: [AuthGuard]  },
  { path: 'township/view', component: TownshipComponent, canActivate: [AuthGuard] },
  { path: 'plots', component: PlotsComponent, canActivate: [AuthGuard] },
  { path: 'plots/view', component: PlotsComponent, canActivate: [AuthGuard] },
  { path: 'township/list', component: ListComponent,canActivate: [AuthGuard]  },
  { path: 'plots/list', component: PlotListComponent,canActivate: [AuthGuard]  },
  { path: 'reports/view', component: ReportsComponent,canActivate: [AuthGuard]  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
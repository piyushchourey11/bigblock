import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { TextTransformPipe } from './custom-pipes/text-transform.pipe';
import { TownshipComponent } from './township/township.component';
import { ScriptService } from './_services/scriptService';
import { AgmCoreModule } from '@agm/core';
import { ListComponent } from './township/list/list.component';
import { PlotsComponent } from './plots/plots.component';
import { PlotListComponent } from './plots/list/list.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    TextTransformPipe,
    TownshipComponent,
    ListComponent,
    PlotsComponent,
    PlotListComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDR3sf_Kv7KnoC15dzDiKgCoeCUOMjppVs',
      libraries: ['places']
    })
  ],
  providers: [
    ScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

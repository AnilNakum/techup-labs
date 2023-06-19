import { NgModule } from '@angular/core';

import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { CommonService } from './_services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [CommonService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from 'src/app/_services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as $ from "jquery";
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  customerData: any = {};

  regions: any = [];
  countries: any = [];
  constructor(public http: HttpClient, private _router: Router, public commonService: CommonService) {
    this.getRegion();
   

  }
  ngOnInit() {
  }

  getRegion() {
    this.commonService.getCountries()
      .subscribe((res: any) => {
        let Data = res.data;
        for (let x in Data) {
          let R = Data[x].region;
          if (!this.regions.includes(R)) {
            this.regions.push(R);
          }
        }
      }, (err) => {
        

      });
  }

  changeRegions(event: any) {
    this.customerData.country = null;
    this.commonService.getCountriesRegion(event)
      .subscribe((res: any) => {
        let Data = res.data;
        for (let x in Data) {
          let C = Data[x].country;
            this.countries.push(C);
        }
      }, (err) => {
      });

  }
  addUpdateCustomer() {
    let Customers:any = (localStorage.getItem('Customers'))?JSON.parse(localStorage.getItem('Customers')??''):[];
    Customers.push(this.customerData);
    localStorage.setItem('Customers',JSON.stringify(Customers));
    this.commonService.closeForm('customer');
    this.commonService.isCustomerChange.next(true);
  }
}

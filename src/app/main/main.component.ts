import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
import * as _ from "lodash";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
Pins:any;
  constructor(public commonService: CommonService, public datepipe: DatePipe) {
    commonService.isPinChange.subscribe(value => {
      if (value) {
        this.getPinList();
        $('.reset_form').click();
      }
    });
  }

  ngOnInit(): void {
    
  }

  getPinList(){
    this.Pins = (localStorage.getItem('Pins'))?JSON.parse(localStorage.getItem('Pins')??''):[];
  }

}

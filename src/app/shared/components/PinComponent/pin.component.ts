import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from 'src/app/_services';
import { FileUploader } from 'ng2-file-upload';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from "jquery";

const URL = 'http://localhost:3000/upload';

@Component({
  selector: "app-pin",
  templateUrl: "./pin.component.html",
  styleUrls: ["./pin.component.scss"]
})
export class PinComponent implements OnInit {
  pinData: any = {};
  Customers: any;
  
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
 
    constructor(private _router: Router, public commonService: CommonService) {
      // this.pinData.privacy = "Private";

      commonService.isCustomerChange.subscribe(value => {
        if (value) {
       this.getCustomers();
        $('.reset_form').click();
      }
    });

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }
  ngOnInit() {
    this.uploader.clearQueue();
  }

  getCustomers(){
    this.Customers = (localStorage.getItem('Customers'))?JSON.parse(localStorage.getItem('Customers')??''):[];
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    if(this.uploader.queue.length > 1){
      this.uploader.queue[0].remove();
    }
  }

  addUpdatePin() {
    if(this.uploader.queue.length <= 0){
      return;
    }
    var formData: any = new FormData();
    formData.append('file', this.uploader.queue[0]._file);

    this.commonService.post(URL, formData)
      .subscribe((res: any) => {
        this.pinData.file = res.file;
        console.log(this.pinData);
        
        let Pins:any = (localStorage.getItem('Pins'))?JSON.parse(localStorage.getItem('Pins')??''):[];
        Pins.push(this.pinData);
        localStorage.setItem('Pins',JSON.stringify(Pins));
        this.commonService.closeForm('pin');
        this.commonService.isPinChange.next(true);
      }, (err) => {

      });

  }

}

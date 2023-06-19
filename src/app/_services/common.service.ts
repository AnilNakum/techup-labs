import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import Swal from "sweetalert2";

@Injectable()
export class CommonService {


    user: any;
    public isPinChange: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public isCustomerChange: BehaviorSubject<any> = new BehaviorSubject<any>({});

    // ------ Local -------- //
    baseURL = "http://localhost:3000/";


    imageUrl: string = '';

    constructor(public http: HttpClient, private router: Router, public toastrService: ToastrService) {
    }

    public showSuccessToast(msg: string, title: string = "Success", options?: any) {
        return this.toastrService.success(msg, title, options);
    }
    public showErrorToast(msg: string = "Something went wrong. Please try again later...", title: string = "Oops!", options?: any) {
        return this.toastrService.error(msg, title, options);
    }
    public showWarningToast(msg: string, title: string = "Warning!", options?: any) {
        return this.toastrService.warning(msg, title, options);
    }
    public showInfoToast(msg: string, title: string = "Info!", options?: any) {
        return this.toastrService.info(msg, title, options);
    }


    viewForm(form:any) {
        $("."+form+"-form").fadeIn(1000);
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
    closeForm(form:any) {
        $("."+form+"-form").fadeOut(800);
    }

    /* Show error toaster for 401 server error and do logout*/
    handleServerError(errStatus: any): any {
        if (errStatus && errStatus.status === 401) {
        }
    }


    getCountries() {
        return this.http.get('https://api.first.org/data/v1/countries')
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    getCountriesRegion(region:any) {
        return this.http.get('https://api.first.org/data/v1/countries?region='+region)
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    post(url:any, data:any) {

        let headers = new HttpHeaders(
            {
                'Access-Control-Allow-Origin': '*'
            }
        );

        return this.http.post( url, data, { headers: headers })
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }
}

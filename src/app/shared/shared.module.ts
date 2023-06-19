import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

import { FileUploadModule } from 'ng2-file-upload';

import { CustomerComponent } from './components/CustomerComponent/customer.component';
import { PinComponent } from './components/PinComponent/pin.component';

@NgModule({
  declarations: [
    CustomerComponent,
    PinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    NgSelectModule,
    FileUploadModule,
    ToastrModule.forRoot(),

  ],
  exports: [
    NgxSpinnerModule,
    NgSelectModule,
    CustomerComponent,
    PinComponent
  ],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}

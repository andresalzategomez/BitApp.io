import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './price/apiService.service';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { PriceService } from './price/price.service';
import { HttpClientModule } from '@angular/common/http';
import { ModelDayComponent } from './model-day/model-day.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceComponent,
    ModelDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PriceService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

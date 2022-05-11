import { Injectable } from '@angular/core';
import { ApiService } from './apiService.service';
import { Price } from './price.model';

let dateDay = new Date();
const monthName = dateDay.toLocaleString("en-US", { month: "long" });


@Injectable()


export class PriceService {
  price:Price[] = [];
  priceToday:Price;
  constructor(private apiService: ApiService) { }

  loadPrices(day:String, month:String)
  {
    this.loadPriceApi(day, "USD", month)
    .subscribe( 
      (price) => {
        this.price.push(new Price(price.data.amount, price.data.base, price.data.currency, day, monthName));
      }
    );
    return this.price;
  }

  loadPriceToday(day:String)
  {
    this.loadPriceApi(day, "USD", "0")
    .subscribe( 
      (price) => {
        this.price[0] = (new Price(price.data.amount, price.data.base, price.data.currency, day, monthName));
      }
    );
    return this.price;
  }
  
  loadPriceApi(day:String, currency:String, month:String){
    return this.apiService.consumeApi(day, currency, month)
  }

  
}

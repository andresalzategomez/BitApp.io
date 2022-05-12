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

  loadPrices(day:String, month:String, currency:String, priceObj:Price[])
  {
    this.price = priceObj;

    this.loadPriceApi(day, currency, month)
    .subscribe( 
    (price) => {
      this.price.push(new Price(price.data.amount, price.data.base, price.data.currency, day, month));
      },
      error => {
        // this.price = JSON.parse(localStorage.getItem('priceUSD'+currency)||"");  
      }
      );
      
    return this.price;
  }

  loadPriceToday(day:String, currency:String, priceObj:Price[], month:String)
  {
    this.price = priceObj;
    this.loadPriceApi(day, currency, "0")
    .subscribe( 
      (price) => {
        this.price[0] = (new Price(price.data.amount, price.data.base, price.data.currency, day, month));
      },
      error => {
        // this.price = JSON.parse(localStorage.getItem('priceUSD'+currency)||"");
      }
    );
    return this.price;
  }
  

  loadPriceApi(day:String, currency:String, month:String){
    return this.apiService.consumeApi(day, currency, month)
  }

  convertMonth(month:String){
    let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    return months[Number(month)-1];
  }
  
}


import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Price } from './price.model';
import { PriceService } from './price.service';

let dateDay = new Date();
let today = dateDay.getDate();
const monthName = dateDay.toLocaleString("en-US", { month: "long" });

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  price:Price[] = [];
  constructor(private priceSerivice: PriceService) { }

  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
        this.loadPrices(String(today - i))
    }
    console.log(this.price);
  }
  
  loadPrices(day:String)
  {
    this.priceSerivice.loadPrice(day)
    .subscribe( 
      (price) => {
        this.price.push(new Price(price.data.amount, price.data.base, price.data.currency, day, monthName));
      }
    );
  }

  activeModel(day: Price){
    
  }
}

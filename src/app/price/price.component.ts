import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDayComponent } from './model-day/model-day.component';
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
  
  @ViewChild(ModelDayComponent) modelDayC:ModelDayComponent;

  constructor(private priceSerivice: PriceService) { }

  ngOnInit(): void {
    for (let i = 0; i < 14; i++) {
        this.loadPrices(String(today - i))
    }
    console.log(this.price);
  }
  
  loadPrices(day:String)
  {
    this.priceSerivice.loadPrice(day, "USD")
    .subscribe( 
      (price) => {
        this.price.push(new Price(price.data.amount, price.data.base, price.data.currency, day, monthName));
      }
    );
  }

  activeModel(day: Price){
    this.modelDayC.openDay("block", day);
  } 
}

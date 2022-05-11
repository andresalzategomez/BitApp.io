import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDayComponent } from './model-day/model-day.component';
import { Price } from './price.model';
import { PriceService } from './price.service';

let today = new Date().getDate();
const monthNumber = new Date().toLocaleString("en-US", { month: "2-digit" });

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  
  price:Price[] = [];
  priceToday:Price;
  sItv:any;
  @ViewChild(ModelDayComponent) modelDayC:ModelDayComponent;

  constructor(private priceSerivice: PriceService) { }

  ngOnInit(): void {
    //this.priceToday = this.priceSerivice.loadPriceToday(String(today));
    //console.log(this.priceToday);
    for (let i = 0; i < 11; i++) {
      this.price = this.priceSerivice.loadPrices(String(today - i), String(monthNumber))
    }
    this.sItv = setInterval(() => {
      this.contador(); 
    }, 5000);
  }
   contador(){
    this.price = this.priceSerivice.loadPriceToday(String(today));
  }
  
  activeModel(day: Price){
    this.modelDayC.openDay("block", day);
  } 
}

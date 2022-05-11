import { Component, Input, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

const monthNumber = new Date().toLocaleString("en-US", { month: "2-digit" });


@Component({
  selector: 'app-model-day',
  templateUrl: './model-day.component.html',
  styleUrls: ['./model-day.component.css']
})
export class ModelDayComponent implements OnInit{
  display:String;
  MonthModel:String;
  dayModel: String;
  priceUSDModel: number;
  priceCOPModel: number;
  priceEURModel: number;

  ngOnInit(): void {
    this.display = "none";
  }

  constructor(private priceService: PriceService){}
  

  openDay(state:String, day:Price){
    this.changeState(state);
    this.MonthModel = day.monthName;
    this.dayModel = day.day;
    this.priceUSDModel = day.amount;
    this.priceService.loadPriceApi(day.day, "COP", monthNumber)
    .subscribe( 
      (price) => {
        this.priceCOPModel = parseInt(price.data.amount);
      }
    );
    this.priceService.loadPriceApi(day.day, "EUR", monthNumber)
    .subscribe( 
      (price) => {
        this.priceEURModel = parseInt(price.data.amount);
      }
    );

  }


  changeState(state:String){
    this.display = state;
  }
}

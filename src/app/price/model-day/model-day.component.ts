import { Component, Input, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

const currentMonth = new Date().toLocaleString("en-US", { month: "2-digit" });
let lastDay = new Date(2022,Number(currentMonth)-1, 0).getDate();


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
  vector:Price[] = [];

  ngOnInit(): void {
    this.display = "none";
  }

  constructor(private priceService: PriceService){}
  

  openDay(state:String, day:Price){
    this.changeState(state);
    this.MonthModel = this.priceService.convertMonth(day.monthName);
    this.dayModel = day.day;
    this.priceUSDModel = day.amount;
    this.priceService.loadPriceApi(day.day, "COP", day.monthName)
    .subscribe( 
      (price) => {
        this.priceCOPModel = parseInt(price.data.amount);
      }
    );
    this.priceService.loadPriceApi(day.day, "EUR", day.monthName)
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

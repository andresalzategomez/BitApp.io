import { Component, Input, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { PriceService } from '../price.service';


@Component({
  selector: 'app-model-day',
  templateUrl: './model-day.component.html',
  styleUrls: ['./model-day.component.css']
})
export class ModelDayComponent implements OnInit{

  @Input() price:Price;
  @Input() states:String;
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
    this.priceService.loadPrice(day.day, "COP")
    .subscribe( 
      (price) => {
        this.priceCOPModel = parseInt(price.data.amount);
      }
    );
    this.priceService.loadPrice(day.day, "EUR")
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

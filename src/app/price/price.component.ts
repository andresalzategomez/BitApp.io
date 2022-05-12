import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDayComponent } from './model-day/model-day.component';
import { Price } from './price.model';
import { PriceService } from './price.service';

let today = new Date().getDate();
let date = new Date();

const currentMonth = new Date().toLocaleString('en-US', { month: '2-digit' });
var monthLoad = 0;
let lastDay = new Date(2022, Number(currentMonth) - 1, 0).getDate();

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit {
  priceUSD: Price[] = [];
  priceCOP: Price[] = [];
  priceEUR: Price[] = [];
  priceToday: Price;
  sItv: any;
  @ViewChild(ModelDayComponent) modelDayC: ModelDayComponent;

  constructor(private priceSerivice: PriceService) {}

  ngOnInit() {
    var dayLoad = today;
    monthLoad = Number(currentMonth);
    for (let i = 0; i < 15; i++) {
      if (today - i === 0) {
        dayLoad = lastDay;
        monthLoad -= 1;
      }
      this.priceUSD = this.priceSerivice.loadPrices(
        String(dayLoad),
        String(monthLoad),
        'USD',
        this.priceUSD
      );
      dayLoad -= 1;
    }

    this.sItv = setInterval(() => {
      this.contador();
    }, 10000);
  }

  contador() {
    this.priceUSD = this.priceSerivice.loadPriceToday(
      String(today),
      'USD',
      this.priceUSD,
      String(monthLoad)
    );

    this.loadLocalStorage();
  }

  activeModel(day: Price) {
    this.modelDayC.openDay('block', day);
  }

  loadLocalStorage() {
    localStorage.setItem('priceUSD', JSON.stringify(this.priceUSD));
  }

  convertMonth(month: String) {
    return this.priceSerivice.convertMonth(month);
  }
}

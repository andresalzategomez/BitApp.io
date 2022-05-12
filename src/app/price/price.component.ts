import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDayComponent } from './model-day/model-day.component';
import { Price } from './price.model';
import { PriceService } from './price.service';

let today = new Date().getDate();
let date = new Date();

const currentMonth = new Date().toLocaleString('en-US', { month: 'numeric' });
let monthLoad = 0;
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
    this.priceUSD = this.loadVector('USD', this.priceUSD);
    this.priceCOP = this.loadVector('COP', this.priceCOP);

    setTimeout(() => {
      this.priceUSD = this.orderVector(this.priceUSD, currentMonth);
      this.loadCurrentPrice();
    }, 1000);

    this.sItv = setInterval(() => {
      this.loadCurrentPrice();
    }, 6000);
  }

  loadVector(currency: String, arrayPrice: Price[]) {
    let arrayAux: Price[] = [...arrayPrice];
    let dayLoad = today;
    monthLoad = Number(currentMonth);
    for (let i = 0; i < 15; i++) {
      if (today - i === 0) {
        dayLoad = lastDay;
        monthLoad -= 1;
      }

      arrayAux = this.priceSerivice.loadPrices(
        String(dayLoad),
        String(monthLoad),
        currency,
        arrayAux
      );
      dayLoad -= 1;
    }
    return arrayAux;
  }

  loadCurrentPrice() {
    this.priceUSD = this.priceSerivice.loadPriceToday(
      String(today),
      'USD',
      this.priceUSD,
      String(currentMonth)
    );

    this.saveLocalStorage('priceUSD', this.priceUSD);
    this.saveLocalStorage('priceCOP', this.priceCOP);
  }

  orderVector(priceArray: Price[], currentMonth: string) {
    return (this.priceSerivice.orderVector(priceArray, currentMonth));
  }

  activeModel(day: Price) {
    this.modelDayC.openDay('block', day);
  }

  saveLocalStorage(clave: string, arrayPrice: Price[]) {
    this.priceSerivice.saveLocalStorage(clave, arrayPrice);
  }

  convertMonth(month: String) {
    return this.priceSerivice.convertMonth(month);
  }
}

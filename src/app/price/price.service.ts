import { Injectable } from '@angular/core';
import { ApiService } from './apiService.service';
import { Price } from './price.model';

let dateDay = new Date();
const monthName = dateDay.toLocaleString('en-US', { month: 'long' });

@Injectable()
export class PriceService {
  price: Price[] = [];
  priceToday: Price;
  constructor(private apiService: ApiService) {}

  loadPrices(day: String, month: String, currency: String, priceObj: Price[]) {
    this.loadPriceApi(day, currency, month).subscribe(
      (price) => {
        priceObj.push(
          new Price(
            price.data.amount,
            price.data.base, 
            price.data.currency,
            day,
            month
          )
        );
      }
      // priceObj = JSON.parse(localStorage.getItem('priceUSD'+currency)||"");
    )

    return priceObj;
  }

  loadPriceToday(
    day: String,
    currency: String,
    priceObj: Price[],
    month: String
  ) {
    this.loadPriceApi(day, currency, '0').subscribe((price) => {
      priceObj[0] = new Price(
        price.data.amount,
        price.data.base,
        price.data.currency,
        day,
        month
      );
    });
    return priceObj;
  }

  loadPriceApi(day: String, currency: String, month: String) {
    return this.apiService.consumeApi(day, currency, month);
  }

  convertMonth(month: String) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[Number(month) - 1];
  }

  saveLocalStorage(clave: string, arrayPrice: Price[]) {
    localStorage.setItem(clave, JSON.stringify(arrayPrice));
  }

  orderVector(priceArray: Price[], currentMonth: string) {
    let currentMonthArray: Price[] = [];
    let prevMonthArray: Price[] = [];
    for (let i = 0; i < priceArray.length; i++) {
      if (priceArray[i].monthName === currentMonth) {
        currentMonthArray.push(priceArray[i]);
      } else {
        prevMonthArray.push(priceArray[i]);
      }
    }
    priceArray = currentMonthArray.sort((a, b) => {
      return Number(b.day) - Number(a.day);
    });
    prevMonthArray = prevMonthArray.sort((a, b) => {
      return Number(b.day) - Number(a.day);
    });
    for (let i = 0; i < prevMonthArray.length; i++) {
      priceArray.push(prevMonthArray[i]);
    }
    return priceArray;
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './apiService.service';
import { Price } from './price.model';

// Fecha para el uso del API
let dateDay = new Date();
const monthName = dateDay.toLocaleString('en-US', { month: 'long' });

@Injectable()
export class PriceService {
  constructor(private apiService: ApiService) {}

  // función para cargar los precios
  loadPrices(day: String, month: String, currency: String, priceObj: Price[]) {
    this.loadPriceApi(day, currency, month).subscribe((price) => {
      priceObj.push(
        new Price(
          price.data.amount,
          price.data.base,
          price.data.currency,
          day,
          month
        )
      );
    });

    return priceObj;
  }

  // Función para cargar el precio del Bitcoin del día actual
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

  // Función para consumir API
  loadPriceApi(day: String, currency: String, month: String) {
    return this.apiService.consumeApi(day, currency, month);
  }

  // función para convertir el Número del Mes en Texto
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

  // Función para guardar en Local Storage
  saveLocalStorage(clave: string, arrayPrice: Price[]) {
    localStorage.setItem(clave, JSON.stringify(arrayPrice));
  }

  // función para ordenar vector de USD
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

  // Función asincrona para validar conexión a internet
  async isOnline() {
    let onlineS: boolean = true;
    await fetch('https://api.coinbase.com/v2/prices/BTC-COP/spot')
      .then(function (response) {
        onlineS = true;
        return response;
      })
      .then(function (response) {
        onlineS = true;
      })
      .catch(function (error) {
        // console.log('Problema al realizar la solicitud: ' + error.message);
        onlineS = false;
      });
    return onlineS;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDayComponent } from './model-day/model-day.component';
import { Price } from './price.model';
import { PriceService } from './price.service';

// Fechas para el uso del API
let today = new Date().getDate();
const currentMonth = new Date().toLocaleString('en-US', { month: 'numeric' });
let monthLoad = 0;
let lastDay = new Date(2022, Number(currentMonth) - 1, 0).getDate();

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit {
  // Vectores para cada moneda
  priceUSD: Price[] = [];
  priceCOP: Price[] = [];
  priceEUR: Price[] = [];
  priceToday: Price; //Variable para uso
  sItv: any; //Variable para uso de set Interval

  @ViewChild(ModelDayComponent) modelDayC: ModelDayComponent;

  constructor(private priceSerivice: PriceService) {}

  async ngOnInit() {
    if (Boolean(this.isOnline())) {
      //Validar si hay conexión a internet

      // Cargar los vectores con la respuesta del consumo del API
      this.priceUSD = this.loadVector('USD', this.priceUSD);
      this.priceCOP = this.loadVector('COP', this.priceCOP);
      this.priceEUR = this.loadVector('EUR', this.priceEUR);

      // SetTimeOut luego de 1 setgundo para ordenar el vector luego de que termine de cargar con las respuestas del API
      setTimeout(() => {
        this.priceUSD = this.orderVector(this.priceUSD, currentMonth);
        this.loadCurrentPrice();
      }, 1000);

      // SetInterval cada 6 segundos para actualizar el precio actual del Bitcoin
      this.sItv = setInterval(() => {
        this.loadCurrentPrice();
      }, 60000);
    } else {
      alert('Sin Conexión a internet');

      // Cargar los vectores con el Local Storage, cuándo no hay conexión a internet
      this.priceUSD = JSON.parse(localStorage.getItem('priceUSD') || '');
      this.priceCOP = JSON.parse(localStorage.getItem('priceCOP') || '');
      this.priceEUR = JSON.parse(localStorage.getItem('priceEUR') || '');
    }
  }

  // función para cargar los vectores con los valores del BitCoin de los útlimos 15 días
  loadVector(currency: String, arrayPrice: Price[]) {
    let arrayAux: Price[] = [...arrayPrice];
    let dayLoad = today;
    monthLoad = Number(currentMonth);

    // ciclo para cargar los últimos 15 días
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

  // función para cargar precio actual del Bitcoin
  loadCurrentPrice() {
    this.priceUSD = this.priceSerivice.loadPriceToday(
      String(today),
      'USD',
      this.priceUSD,
      String(currentMonth)
    );

    // Guardar en local Storage cada que consume el API
    this.saveLocalStorage('priceUSD', this.priceUSD);
    this.saveLocalStorage('priceCOP', this.priceCOP);
    this.saveLocalStorage('priceEUR', this.priceEUR);
  }

  // Función para ordenar Vector de USD
  orderVector(priceArray: Price[], currentMonth: string) {
    return this.priceSerivice.orderVector(priceArray, currentMonth);
  }

  // Función para activar el componente los precios de 1 día
  activeModel(day: Price) {
    this.modelDayC.openDay('block', day);
  }

  // Función para guardar en Local Storage
  saveLocalStorage(clave: string, arrayPrice: Price[]) {
    this.priceSerivice.saveLocalStorage(clave, arrayPrice);
  }

  // Función para convertir Número de Mes en Texto
  convertMonth(month: String) {
    return this.priceSerivice.convertMonth(month);
  }

  // Función para Validar conexión a internet
  isOnline() {
    return this.priceSerivice.isOnline();
  }
}

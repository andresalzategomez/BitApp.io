import { Component, Input, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-model-day',
  templateUrl: './model-day.component.html',
  styleUrls: ['./model-day.component.css'],
})
export class ModelDayComponent implements OnInit {
  display: String; //variable para stilo Display del modal
  MonthModel: String;
  dayModel: String;
  priceUSDModel: number;
  priceCOPModel: number;
  priceEURModel: number;

  ngOnInit(): void {
    this.display = 'none';
  }

  constructor(private priceService: PriceService) {}

  // Función para abrir el componente que describe el valor de todas las monedas de cada día
  openDay(state: String, day: Price) {
    this.changeState(state);
    this.MonthModel = this.priceService.convertMonth(day.monthName);
    this.dayModel = day.day;
    this.priceUSDModel = day.amount;

    // Cargar los vectores auxiliares con la almacenada en el Local Storage
    let ArrayCop: Price[] = JSON.parse(localStorage.getItem('priceCOP') || '');
    let ArrayEUR: Price[] = JSON.parse(localStorage.getItem('priceEUR') || '');
    this.priceCOPModel = parseInt(
      String(ArrayCop.find((element) => (element.day = day.day))?.amount)
    );
    this.priceEURModel = parseInt(
      String(ArrayEUR.find((element) => (element.day = day.day))?.amount)
    );
  }

  // Cambiar el estado del stilo "display" del modal
  changeState(state: String) {
    this.display = state;
  }
}

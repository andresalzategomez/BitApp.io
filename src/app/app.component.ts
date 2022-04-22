import { Component } from '@angular/core';


let dateDay = new Date();
let today = dateDay.getDate();
let lastWeek = today - 7;
let lastDay = new Date(dateDay.getFullYear(), dateDay.getMonth(), 0).getDate();
let lastMonth = dateDay.getMonth();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(){}
  title = 'BitApp';
  today = today;
  btcToday = "USD 425,02";
  lastWeek = lastWeek;
  twoLastWeek = today - 14;
  lastDay = lastDay;
  lastMonth = lastMonth;

}

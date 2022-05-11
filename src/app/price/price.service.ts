import { Injectable } from '@angular/core';
import { ApiService } from './apiService.service';
import { Price } from './price.model';

@Injectable()

export class PriceService {

  constructor(private apiService: ApiService) { }
  
  loadPrice(day:String, currency:String){
    return this.apiService.consumeApi(day, currency)
  }
}

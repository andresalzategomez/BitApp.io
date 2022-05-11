import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Price } from './price.model';

@Injectable()

export class ApiService{

  constructor(private httpClient: HttpClient){}

  consumeApi(day:String, currency:String):Observable<any>{
    return this.httpClient.get('https://api.coinbase.com/v2/prices/BTC-'+currency+'/spot?date=2022-04-' + day);
  }
} 
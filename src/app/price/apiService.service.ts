import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class ApiService{

  constructor(private httpClient: HttpClient){}

   consumeApi(day:String, currency:String, month:String):Observable<any>{
    if(month === "0")
    {
      return this.httpClient.get('https://api.coinbase.com/v2/prices/BTC-'+currency+'/spot');
    }else{
      return this.httpClient.get('https://api.coinbase.com/v2/prices/BTC-'+currency+'/spot?date=2022-'+month+'-'+day);
    }
    
  }
} 
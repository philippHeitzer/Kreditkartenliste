import { Injectable } from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {concatMap, delay, retryWhen } from 'rxjs/operators';
import {Subject, Observable, EMPTY,of, throwError} from 'rxjs';



export enum Errors {
  AuthenticationError,
  FetchDataError
}

@Injectable({
  providedIn: 'root'
})
export class CreditcardRepositoryService {


  public creditCards : CreditCard[]=[];

  private creditCardsSubject= new Subject<any>();

  private fetchDataError= false;

  constructor(private http: HttpClient) { }

  public accessToken;

    get creditCards$()
    {
      let retryCount=3;
      let retryWaitMilliSeconds=1000;

      const ownHeaders2 = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken});
  
        return this.http.get<CreditCard[]>('https://credit-card-list.application.riecken.io/credit-cards',{headers: ownHeaders2})
        .pipe(
          ( retryWhen(error => 
            error.pipe(
              concatMap((error, count) => {
                if (count <= retryCount) {
                  return of(error);
                }
                return EMPTY;
              }),
              delay(retryWaitMilliSeconds)
            )
          )
          )
        )
          
    }

}

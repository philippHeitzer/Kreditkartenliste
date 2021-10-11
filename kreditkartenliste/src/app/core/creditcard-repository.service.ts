import { Injectable } from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { catchError, retry, retryWhen, concatMap,delay,tap, repeatWhen} from 'rxjs/operators';
import {Subject, Observable, throwError, of, BehaviorSubject} from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';



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

  private _data;

  private AuthenticationError= false;

  constructor(private http: HttpClient) { }

  public accessToken;


  public get data()
  {
    return this._data;
  }
  
/*public async fetchCreditCardsWrapper(accessToken)
{
  let retryCount=3;

  for(let j=0; j<retryCount;j++)
  {
    this._data = await this.fetchCreditCardsTest(accessToken);
    if(this._data !=  Errors.FetchDataError && this._data != undefined)
    {
      return this._data;
    }
  }
    return Errors.FetchDataError;

}*/

    get creditCards$()
    {
      const ownHeaders2 = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken});
  
      return this.http.get<CreditCard[]>('https://credit-card-list.application.riecken.io/credit-cards',{headers: ownHeaders2}).pipe((repeatWhen(_ => this.creditCardsSubject.asObservable())))

    }

    /*public fetchCreditCards(accessToken)
    {
      if(accessToken != 0) {
        const ownHeaders2 = new HttpHeaders({'Authorization': 'Bearer '+ accessToken});
  
        this.http.get('https://credit-card-list.application.riecken.io/credit-cards',{headers: ownHeaders2}).toPromise().then(function successCallback(response){

          return response["body"];

        },function errorCallback(response){
          return Errors.AuthenticationError;
        });
      }
    }*/
  
  
}

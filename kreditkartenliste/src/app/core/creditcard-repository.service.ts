import { Injectable } from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {tap, concatMap, delay, repeatWhen, retryWhen, switchMap } from 'rxjs/operators';
import {Subject, Observable, EMPTY,of, throwError, EmptyError} from 'rxjs';
import { LoginService } from './login.service';
import { ThrowStmt } from '@angular/compiler';



export enum Errors {
  AuthenticationError,
  FetchDataError
}

@Injectable({
  providedIn: 'root'
})
export class CreditcardRepositoryService {

  private baseUrl : string='https://credit-card-list.application.riecken.io'

  public creditCards : CreditCard[]=[];

  private creditCardsSubject= new Subject<any>();

  private fetchDataError= false;

  constructor(private http: HttpClient,private loginService : LoginService) { }

  public accessToken;

  
    public add(newCreditCard : CreditCard)  
    {
      let ownHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken, 'Content-Type': 'application/json'});
       
      return this.http.post(this.baseUrl+'/credit-cards',
      JSON.stringify({"owner": newCreditCard.owner, "number": Number(newCreditCard.number), "cvv": Number(newCreditCard.cvv),"expiration": newCreditCard.expiration}),
      {headers: ownHeaders}).pipe(tap(item => this.creditCardsSubject.next(item)))
    }

    get creditCards$()
    {
      let retryCount=2;
      let retryWaitMilliSeconds=1000;

      
      let ownHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken});
      console.log(ownHeaders);
  
        return this.http.get<CreditCard[]>(this.baseUrl+'/credit-cards',{headers: ownHeaders})
        .pipe(
          ( repeatWhen(_ => this.creditCardsSubject.asObservable()),
            retryWhen(error => 
            error.pipe(
              concatMap((error, count) => {
                if(count < retryCount && error.status == 401)
                {   
                    
                }
                else if (count < retryCount) {
                  return of(error);
                }
                return throwError(error);
              }),
              delay(retryWaitMilliSeconds)
            )
          )     
          )

        )
    }

  

}

import { Injectable } from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, concatMap, delay, retryWhen } from 'rxjs/operators';
import {Subject, Observable, EMPTY,of, throwError, EmptyError} from 'rxjs';
import { LoginService } from './login.service';



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

  constructor(private http: HttpClient,private loginService : LoginService) { }

  public accessToken;

    get creditCards$()
    {
      let retryCount=2;
      let retryWaitMilliSeconds=1000;

      let ownHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken});
  
        return this.http.get<CreditCard[]>('https://credit-card-list.application.riecken.io/credit-cards',{headers: ownHeaders})
        .pipe(
          ( retryWhen(error => 
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

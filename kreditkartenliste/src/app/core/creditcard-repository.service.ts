import { Injectable ,Input, OnChanges,SimpleChanges} from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { concatMap, delay, retryWhen} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import { LoginService } from './login/login.service';
import { Errors } from './Errors';


@Injectable({
  providedIn: 'root'
})
export class CreditcardRepositoryService implements OnChanges {

  private baseUrl : string='https://credit-card-list.application.riecken.io';

   @Input() fetchDataError : boolean= false;

  public getFetchDataError()
  {
    return this.fetchDataError;
  }

  //Intent: if status of fetchDataError changes, call this method -- doesn't work
  ngOnChanges(changes : SimpleChanges)
  {
      console.log(changes.fetchDataError.currentValue);
  }


  constructor(private http: HttpClient,private loginService : LoginService) {
    
   }

  public accessToken;

  //send new CreditCard via POST-Request
    public add(newCreditCard : CreditCard)  
    {
      let retryCount=2;
      let retryWaitMilliSeconds=500;
      let ownHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.accessToken, 'Content-Type': 'application/json'});
       
      return this.http.post(this.baseUrl+'/credit-cards',
      JSON.stringify({"owner": newCreditCard.owner, "number": Number(newCreditCard.number), "cvv": Number(newCreditCard.cvv),"expiration": newCreditCard.expiration}),
      {headers: ownHeaders}).pipe(retryWhen(error => 
        error.pipe(
            concatMap((error, count) => {
              if(count < retryCount && error.status == 401)
              {   
                //if StatusCode 401-unauthorized returns, throw Error
                return throwError(error);
              }
              else if (count < retryCount) {
                return of(error);
              }
              //if all 3 tries failed, throw error
              return throwError(error);
            }),
            //wait some time to repeat request tries
            delay(retryWaitMilliSeconds)
          )
        )     
      )
    }

    public getCreditCards(accessToken)
    {
      let retryCount=2;
      let retryWaitMilliSeconds=500;

      
      let ownHeaders = new HttpHeaders({'Authorization': 'Bearer '+ accessToken});
      
  
        return this.http.get<CreditCard[]>(this.baseUrl+'/credit-cards',{headers: ownHeaders})
        .pipe(
          ( retryWhen(error => 
              error.pipe(
                concatMap((error, count) => {
                  if(count < retryCount && error.status == 401)
                  {   
                      this.fetchDataError=true;
                      return throwError(error);
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

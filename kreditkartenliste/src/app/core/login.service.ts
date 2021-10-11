import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';


export enum Errors {
  AuthenticationError,
  FetchDataError
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public isLoggedIn = false;

  public accessToken;

  constructor(private http: HttpClient) {
}

   public async getAccessToken()
   {
    let response= await this.authenticateWrapper();
    if(response==Errors.AuthenticationError)
    {
      return Errors.AuthenticationError;
    }
    return response;
   }


  public authenticate()
  {
        const ownHeaders = new HttpHeaders({'Access-Control-Allow-Origin':'*','Content-Type':'application/json'});

        return this.http.post('https://credit-card-list.application.riecken.io/login',
        JSON.stringify( {'username': 'philipp','token': 'LAE2xIA2avaeor768enivaR3783583VAeVaea7ioaF'}),
        {headers : ownHeaders}).toPromise().then(function successCallback(response){

          return response["accessToken"];

        },function errorCallback(response){
          return Errors.AuthenticationError;
        })
    
    }


  public async authenticateWrapper()
  {
    
    let retryCount=3;

    for(let i=0; i<retryCount;i++)
    {
      this.accessToken = await this.authenticate();
      
      if(this.accessToken!= Errors.AuthenticationError)
      {
        return this.accessToken;
      }
    }
    if(this.accessToken== Errors.AuthenticationError)
    {
      return Errors.AuthenticationError;
    }
  }
}

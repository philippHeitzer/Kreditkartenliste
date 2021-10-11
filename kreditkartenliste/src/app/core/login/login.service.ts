import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Errors } from '../Errors';

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
     //execute request
    let response= await this.authenticateWrapper();
    //check response for error
    if(response==Errors.AuthenticationError)
    {
      return Errors.AuthenticationError;
    }
    //if no error occured, return accessToken as response
    return response;
   }


  public authenticate()
  {
        //define header for request
        const ownHeaders = new HttpHeaders({'Access-Control-Allow-Origin':'*','Content-Type':'application/json'});


        return this.http.post('https://credit-card-list.application.riecken.io/login',
        JSON.stringify( {'username': 'philipp','token': 'LAE2xIA2avaeor768enivaR3783583VAeVaea7ioaF'}),
        {headers : ownHeaders}).toPromise().then(function successCallback(response){

          //on success, return accessToken
          return response["accessToken"];

        },function errorCallback(response){

          //on failure,return Error
          return Errors.AuthenticationError;
        })
    
    }


  public async authenticateWrapper()
  {
    let retryCount=3;

    //3 tries for request
    for(let i=0; i<retryCount;i++)
    {
      this.accessToken = await this.authenticate();
      
      //if no error occured, return the accessToken
      if(this.accessToken!= Errors.AuthenticationError)
      {
        return this.accessToken;
      }
    }
    //if all 3 requests failed, return Error
    if(this.accessToken== Errors.AuthenticationError)
    {
      return Errors.AuthenticationError;
    }
  }
}

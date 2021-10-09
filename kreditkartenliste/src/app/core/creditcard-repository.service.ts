import { Injectable } from '@angular/core';
import { CreditCard } from './creditCard';
import { HttpClient, HttpClientModule , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditcardRepositoryService {


  public creditCards : CreditCard[]=[];


  constructor(private http: HttpClient) { }

  public getData()
  {
    this.authenticate();
  }

  public async authenticate()
  {
    const ownHeaders = new HttpHeaders({'Access-Control-Allow-Origin':'*','Content-Type':'application/json'});

    this.http.post('https://credit-card-list.application.riecken.io/login',
    JSON.stringify( {'username': 'philipp','password': 'LAE2xIA2avaeor768enivaR3783583VAeVaea7ioaF'}),
    {headers : ownHeaders}).subscribe((data) => {
      console.log(data);
    })
  }

}

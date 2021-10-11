import { Component, OnInit } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { CreditcardRepositoryService } from '../core/creditcard-repository.service';
import { CreditCard } from '../core/creditCard';
import { LoginService } from '../core/login.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {


  creditCards: Observable<CreditCard[]>

  accessToken;

   myObserver = {
    next: (x: CreditCard[]) => console.log('Observer got a next value: ' + x),
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  }
  
  constructor(private creditCardRepository : CreditcardRepositoryService, private loginService : LoginService)
  {
    this.getData();
  }

  ngOnInit(): void {

    
  }

  public async getData()
  {
    this.accessToken=await this.loginService.getAccessToken();
    console.log(this.accessToken);
    this.creditCardRepository.accessToken= this.accessToken;
    this.creditCards= this.creditCardRepository.creditCards$;
  }

}

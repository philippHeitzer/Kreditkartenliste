import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable ,of} from 'rxjs';
import { CreditcardRepositoryService } from '../core/creditcard-repository.service';
import { CreditCard } from '../core/creditCard';
import { LoginService } from '../core/login.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  displayedColumns: string[]= ['name','number','cvv','expiration'];
  dataSource = new MatTableDataSource<CreditCard>();
  creditCards: Observable<CreditCard[]>
  error: Boolean = false;

  accessToken;

  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

  
  constructor(private creditCardRepository : CreditcardRepositoryService, private loginService : LoginService)
  {
    this.getData();
  }

  ngOnInit(): void {

  }

  public async getData()
  {
    this.accessToken=await this.loginService.getAccessToken();

    if(this.accessToken!=0)
    {
      this.error=false;
      this.creditCardRepository.accessToken= this.accessToken;
      this.creditCards= this.creditCardRepository.creditCards$;
      this.creditCards.subscribe( creditCards => {
        this.dataSource.data= creditCards;
        this.dataSource.paginator= this.paginator;
     });
     }
     else{
      this.error= true;
    }
   
  }

}

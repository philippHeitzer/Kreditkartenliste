import { Component,  OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditcardRepositoryService } from '../core/creditcard-repository.service';
import { CreditCard } from '../core/creditCard';
import { LoginService } from '../core/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Errors} from '../core/Errors';


@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit{

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

      if(this.accessToken!= Errors.AuthenticationError)
      {
        this.error=false;
        this.creditCardRepository.accessToken= this.accessToken;
        this.creditCards= this.creditCardRepository.getCreditCards(this.accessToken);   

          this.creditCards.subscribe( 
          creditCards => {
          this.dataSource.data= creditCards;
          this.dataSource.paginator= this.paginator;
        });
      }
      else{
        this.error= true;
      }
   
    

  }


}

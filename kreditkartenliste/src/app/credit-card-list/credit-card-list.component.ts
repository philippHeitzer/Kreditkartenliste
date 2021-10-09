import { Component, OnInit } from '@angular/core';
import { CreditcardRepositoryService } from '../core/creditcard-repository.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  constructor(private creditCardRepository: CreditcardRepositoryService) { }

  ngOnInit(): void {

    this.creditCardRepository.getData();

  }

}

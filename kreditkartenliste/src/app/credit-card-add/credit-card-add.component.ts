import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators ,FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CreditcardRepositoryService } from '../core/creditcard-repository.service';
import { CreditCard } from '../core/creditCard';
import { LoginService } from '../core/login/login.service';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.css']
})
export class CreditCardAddComponent implements OnInit {

  creditCardForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  error = false;

  ownerFirstnameFormControl = new FormControl('', [Validators.required])
  ownerLastnameFormControl = new FormControl('', [Validators.required])
  //16 digits required
  cardNumberFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')])
  //3 digits required
  cvvFormControl = new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')])
  //inspired by https://regex101.com/library/AFarfB
  //pattern: MM/YY
  expirationFormControl = new FormControl('',[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')])

  constructor(private fb: FormBuilder,private creditCardRepository : CreditcardRepositoryService,private loginService : LoginService,private router: Router) {
    this.creditCardForm = fb.group({
      ownerFirst : this.ownerFirstnameFormControl,
      ownerLast : this.ownerLastnameFormControl,
      cardNumber : this.cardNumberFormControl,
      cvv : this.cvvFormControl,
      expiration : this.expirationFormControl
    })
   }

  ngOnInit(): void {
    this.error= false;
  }

  public async submit() {
    if(!this.creditCardForm.valid)
    {return;}

    const value = this.creditCardForm.value;

    

    const creditCard : CreditCard ={

      id: 0,
      owner: (value.ownerFirst+" "+value.ownerLast),
      number: value.cardNumber,
      cvv: value.cvv,
      expiration: this.handleExpirationFormat(value.expiration)
    }

    let accessToken=await this.loginService.getAccessToken();
    let oldAccessToken;

   
    this.creditCardRepository.accessToken= accessToken;

    //check if got new accessToken for POST new CreditCard Data
    if(oldAccessToken!=this.creditCardRepository.accessToken)
    {
      this.creditCardRepository.add(creditCard).subscribe();
    }

    if(this.creditCardRepository.fetchDataError == true)
    {
      this.error=true;
    }
    else
    {
      this.creditCardForm.reset();
      this.router.navigate(['list']);
    }
   
  
  }

  //format MM/YY into MM_YYYY
  public handleExpirationFormat(dateString) : string
  {
    let splittedString= dateString.split("/",2);

    return splittedString[0]+"_"+"20"+splittedString[1];
  }

  get ownerFirst()
  {
    return this.creditCardForm.get('ownerFirst');
  }

  get ownerLast()
  {
    return this.creditCardForm.get('ownerFirst');
  }

  get cardNumber()
  {
    return this.creditCardForm.get('cardNumber')
  }

  get cvv()
  {
    return this.creditCardForm.get('cvv')
  }

  get expiration()
  {
    return this.creditCardForm.get('expiration')
  }

}

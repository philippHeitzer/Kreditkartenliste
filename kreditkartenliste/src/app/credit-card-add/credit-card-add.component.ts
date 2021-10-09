import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators ,FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


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

  ownerFormControl = new FormControl('', [Validators.required])
  cardNumberFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')])
  cvvFormControl = new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')])
  //inspired by https://regex101.com/library/AFarfB
  expirationFormControl = new FormControl('',[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')])

  constructor(private fb: FormBuilder) {
    this.creditCardForm = fb.group({
      owner : this.ownerFormControl,
      cardNumber : this.cardNumberFormControl,
      cvv : this.cvvFormControl,
      expiration : this.expirationFormControl
    })
   }

  ngOnInit(): void {
  }

  submit() {}


  get owner()
  {
    return this.creditCardForm.get('owner');
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

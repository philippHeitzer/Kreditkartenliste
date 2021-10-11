import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardAddComponent } from './credit-card-add.component';

describe('CreditCardAddComponent', () => {
  let component: CreditCardAddComponent;
  let fixture: ComponentFixture<CreditCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date String right',() => {

    expect(component.handleExpirationFormat("01/22")).toEqual("01_2022")
  });
});

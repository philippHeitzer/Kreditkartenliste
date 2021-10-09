import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreditCardListComponent } from './credit-card-list/credit-card-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { CreditcardRepositoryService } from './core/creditcard-repository.service';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    CoreModule.forRoot()
  ],
  providers: [CreditcardRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

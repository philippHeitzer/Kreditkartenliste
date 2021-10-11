import { Optional, SkipSelf,ModuleWithProviders,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditcardRepositoryService } from './creditcard-repository.service';
import { LoginService } from './login/login.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        CreditcardRepositoryService,
        LoginService
      ]
    }
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModules is already loaded. Import it in the root app module only');
    }
  }
}

import { Component } from '@angular/core';
import {trigger,state,style,transition, animate,keyframes} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger('buttonanimation',[
    state('small',style({height: '0px'})),
    state('large',style({height: '300px'})),

    transition('small <=> large', animate('400ms ease-in'))
  ])
  ]
})
export class AppComponent {
  
  title='kreditkartenliste';
  state: string= 'small';

  animateButton(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}

export class CreditCard {
    
    public id : number;
    public owner : string;
    public number : string;
    public cvv : string;
    public expiration : Date;

    constructor(id : number,
         owner : string,
         number: string,
         cvv : string,
         expiration : Date){
             this.id = id;
             this.owner = owner;
             this.number = number;
             this.cvv = cvv;
             this.expiration = expiration;
         }


  
}
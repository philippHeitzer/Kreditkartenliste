export class CreditCard {
    
    private _id : number;
    private _owner : string;
    private _cardNumber : string;
    private _cvv : string;
    private _expiration : Date;

    constructor(id : number,
         owner : string,
         cardNumber: string,
         cvv : string,
         expiration : Date){
             this._id = id;
             this._owner = owner;
             this._cardNumber = cardNumber;
             this._cvv = cvv;
             this._expiration = expiration;
         }


   public get id()
   {
        return this._id;
   }

   public get owner()
   {
       return this._owner;
   }

   public get cardNumber()
   {
       return this._cardNumber;
   }

   public get cvv()
   {
       return this._cvv;
   }

   public get expiration()
   {
       return this._expiration;
   }
}
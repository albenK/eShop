import { Product } from "./product";

/*
    ABOUT ME: The purpose of this class is to define some typing for a shopping cart item
    and what properties it has. 
*/

export class ShoppingCartItem {
    constructor(public product:Product,public quantity:number) {}
    
    getTotalPrice():number {
        return this.product.price * this.quantity;
    }
}
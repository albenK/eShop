import { ShoppingCartItem } from "./shopping-cart-item";

/* 
    ABOUT ME: The purpose of this class is to provide some logic for a shopping cart
    and what properties it has. The Shopping cart we get from the database will be of
    this type.
*/
export class ShoppingCart {
    constructor(public Items:ShoppingCartItem[],public dateCreated:Date) {
        console.log("ShoppingCart constructor is called and total items are:");
    }
    //TODO: Fix localStorage issue with shopping cart
    //Adds up the quantity of each item in shopping cart.
    getTotalNumberOfItems():number {
        let totalNumberOfItems = 0;
        for(let eachProduct in this.Items)
            totalNumberOfItems += this.Items[eachProduct].quantity;
        return totalNumberOfItems;
    }

}
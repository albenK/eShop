import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

/* 
    ABOUT ME: The purpose of this class is to provide some logic for a shopping cart
    and what properties it has. The Shopping cart we get from the database will be of
    this type.
*/
export class ShoppingCart {
    items:ShoppingCartItem[];//represents items in shopping cart.
    constructor(public itemsMap:{[productId:string]:ShoppingCartItem},public dateCreated:Date) {
        this.itemsMap = itemsMap || {};
        /*we need to initialize items array, so we can use this in other components.
        helps with *ngFor directive. */
        this.initializeItemsArray();
    }

    private initializeItemsArray() {
        this.items = [];
        for(let eachProductId in this.itemsMap) {
            let item = this.itemsMap[eachProductId];
            let shoppingCartItem:ShoppingCartItem = new ShoppingCartItem();
            //Object.assign() copies all properties from item to shoppingCartItem.
            Object.assign(shoppingCartItem,item); 
            shoppingCartItem.$key = eachProductId;
            this.items.push(shoppingCartItem);
        }
    }

    // for displaying the quantity of an item thats within shopping cart.
    getQuantity(product:Product):number {
        let item = this.itemsMap[product.$key];
        return (item)?(item.quantity):(0);
    }

    //TODO: Fix localStorage issue with shopping cart
    /*Adds up the quantity of each item in shopping cart. 
        This is used to display the badge on the toolbar.
    */
    getTotalNumberOfItems():number {
        let totalNumberOfItems = 0;
        for(let eachProductId in this.itemsMap)
            totalNumberOfItems += this.itemsMap[eachProductId].quantity;
        return totalNumberOfItems;
    }

    getTotalPrice():number {
        let totalPrice:number = 0;
        this.items.forEach((item:ShoppingCartItem) => {
            totalPrice += item.getTotalPrice();
        });
        return totalPrice;
    }

}
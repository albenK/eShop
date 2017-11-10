import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

/* 
    ABOUT ME: The purpose of this class is to provide some logic for a shopping cart
    and what properties it has. The Shopping cart we get from the database will be of
    this type.
*/
export class ShoppingCart {
    items:ShoppingCartItem[];//represents items in shopping cart.
    constructor(private itemsMap:{[productId:string]:ShoppingCartItem},public dateCreated:number) {
        this.itemsMap = itemsMap || {};
        this.dateCreated = dateCreated || new Date().getTime();
        /*we need to initialize items array, so we can use this in other components.
        helps with *ngFor directive. */
        this.initializeItems();
    }

    private initializeItems() {
        this.items = [];
        for(let eachProductId in this.itemsMap) {
            const item = this.itemsMap[eachProductId];
            const shoppingCartItem:ShoppingCartItem = new ShoppingCartItem({
                ...item,//copies all of the properties of item into this object.
                itemId:eachProductId
            });
            this.items.push(shoppingCartItem);
        }
    }

    // for displaying the quantity of an item thats within shopping cart.
    getQuantity(product:Product|ShoppingCartItem):number {
        if(product instanceof ShoppingCartItem) {
            const item = this.itemsMap[product.itemId];
            return (item)?(item.quantity):(0);
        }
        //else it's a Product Object.
        let item = this.itemsMap[product.$key];
        return (item)?(item.quantity):(0);
    }

    /*Adds up the quantity of each item in shopping cart. 
        This is used to display the badge on the toolbar.
    */
    getTotalNumberOfItems():number {
        let totalNumberOfItems = 0;
        for(let eachProductId in this.itemsMap)
            totalNumberOfItems += this.itemsMap[eachProductId].quantity;
        return totalNumberOfItems;
    }

    /*getTotalPrice() returns the total price that user has to pay.
    We use this in the shopping-cart.component.ts file and wherever else
    necessary.*/
    getTotalPrice():number {
        let totalPrice:number = 0;
        this.items.forEach((item:ShoppingCartItem) => {
            totalPrice += item.getTotalPrice();
        });
        return totalPrice;
    }

}
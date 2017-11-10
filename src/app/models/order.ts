import { Shipping } from "./shipping";
import { ShoppingCart } from "./shopping-cart";
import { OrderItem } from "./order-item";


/* 
    ABOUT ME: The purpose of this class is to define what properties an order has
    and also to provide some typing.
*/
export class Order {
    datePlaced:number;
    items:OrderItem[];
    constructor(public userId:string,public shipping:Shipping,shoppingCart:ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.setupOrderItems(shoppingCart); // initialize this.items
    }

    private setupOrderItems(cart:ShoppingCart) {
        this.items = cart.items.map((eachItem) => {
            return {
                product: {
                    title:eachItem.title,
                    imageUrl:eachItem.imageUrl,
                    price:eachItem.price,
                },
                quantity:eachItem.quantity,
                totalPrice:eachItem.getTotalPrice()
            };
        });
    }
}
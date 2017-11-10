/* 
    ABOUT ME: The purpose of this interface is to define what an order item is.
    An order item has a product object, not a "Product" type. The product object that goes here
    is a bit different than a "Product" type. It also has a quantity property,which represents 
    the quantity of the item the user wants to order. Total Price is quantity * price per item.

*/
export interface OrderItem {
    product:{
        title:string;
        imageUrl:string;
        price:number;
    };
    quantity:number;
    totalPrice:number;
}
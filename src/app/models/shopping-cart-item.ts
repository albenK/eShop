import { Product } from "./product";

/*
    ABOUT ME: The purpose of this interface is to define some typing for a shopping cart item
    and what properties it has. 
*/

export interface ShoppingCartItem {
    product:Product,
    quantity:number;
}
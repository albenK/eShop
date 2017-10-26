import { ShoppingCartItem } from "./shopping-cart-item";

/* 
    ABOUT ME: The purpose of this interfae is to provide some typing for a shopping cart
    and what properties it has.
*/
export interface ShoppingCart {
    Items:ShoppingCartItem[],
    dateCreated:Date;
}
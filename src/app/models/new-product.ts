/* 
    ABOUT ME: The purpose of this interface is just to define what a NewProduct is
    and what properties it has. This is used to provide some typing when an admin creates
    a new product within the product-form.component.
*/
export interface NewProduct {
    title:string;
    price:number;
    category:string;
    imageUrl:string;
}
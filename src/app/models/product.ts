/* 
    ABOUT ME: The purpose of this interface is just to define what a Product is
    and what properties it has. This is used to provide some typing for a product.
*/
export interface Product {
    $key?:string;//refers to firebase generated id.
    title:string;
    price:number;
    category:string;
    imageUrl:string;
}
/* 
    ABOUT ME: The purpose of this interface is to define what a FilterEvent is. When
    a user is filtering for products, the data we send to the parent component will be of
    FilterEvent type.
*/
export interface FilterEvent {
    filterBy:string; // category,user search,price...etc
    valueToFilterBy:string; //actual value
}
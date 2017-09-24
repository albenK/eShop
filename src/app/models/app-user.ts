/* 
    ABOUT ME: The purpose of this interface is just to define what an appUser is
    and what properties an appUser has.
*/
export interface AppUser {
    id:string;
    name:string;
    email:string;
    isAdmin:boolean;
}
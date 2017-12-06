/* 
    ABOUT ME: The purpose of this interface is just to define what an appUser is
    and what properties an appUser has. An AppUser is just data we get from firebase database.
*/
export interface AppUser {
    $key:string; //represents uuid from firebase database.
    name:string;
    email:string;
    isAdmin:boolean;
}

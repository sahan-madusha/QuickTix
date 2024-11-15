//site users
export type UserRoles = "CUSTOMER" | "VENDOR" ;
export enum UserRolesEnum {
  customer = "CUSTOMER",
  vendor = "VENDOR",
}
//payHere
declare global {
  interface Window {
    payhere: any;
  }
}

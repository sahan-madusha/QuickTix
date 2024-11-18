//site users
export type UserRoles = "CUSTOMER" | "VENDOR" | "ADMIN";
export enum UserRolesEnum {
  customer = "CUSTOMER",
  vendor = "VENDOR",
  admin = "ADMIN",
}
//payHere
declare global {
  interface Window {
    payhere: any;
  }
}

export type UserUi = "DASHBOARD" | "ADDITEM" | "UPDATEITEM" | "MYITEM";
export enum UserUiEnum {
  dashboard = "DASHBOARD",
  additem = "ADDITEM",
  updateitem = "UPDATEITEM",
  myitem = "MYITEM",
}

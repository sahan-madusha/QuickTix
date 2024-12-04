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

export type UserUi = "DASHBOARD" | "MYITEM" | "APPCONFIG"|"ADDEVENT"|"SYSTEMLOGS"|"ADDTICKETS";

export enum UserUiEnum {
  dashboard = "DASHBOARD",
  myitem = "MYITEM",
  appconfig = 'APPCONFIG',
  addevent = "ADDEVENT",
  systemlogs = "SYSTEMLOGS",
  addticket = "ADDTICKETS"
}

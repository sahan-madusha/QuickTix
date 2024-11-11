//site users
export type UserRoles = "guest" | "guide" | "user" | "admin";
export enum UserRolesEnum {
  admin = "trained-guide-admin",
  user = "user",
  guest = "guest",
  guide = "guide",
}
export const ReviewList = [
  "Attention",
  "Explain & Understanding",
  "Vehicle & Safe",
  "Value For Money",
  "Overall comment",
];

export enum IBookingStatus {
  requested = "REQUESTED",
  rejected = "REJECTED",
  cancelled = "CANCELLED",
  accepted = "ACCEPTED",
  firstPaymentPending = "FIRST_PAYMENT_PENDING",
  firstPaymentDone = "FIRST_PAYMENT_DONE",
  secondPaymentDone = "SECOND_PAYMENT_DONE",
  tourCompleted = "TOUR_COMPLETED",
  refundRequested = "REFUND_REQUESTED_GUEST",
  refundGuideRequested = "REFUND_REQUESTED_GUIDE",
  refundCompleted = "REFUND_COMPLETED",
  refundRejected = "REFUND_REJECTED",
  reviewadded = "REVIEW_ADDED",
}

export enum IAdminreviewStatus {
  pending = "PENDING",
  rejected = "REJECTED",
  accepted = "ACCEPTED",
  blocked = "BLOCKED",
}

export enum IPaymentType {
  booking = "BOOKING",
  guestRefund = "GUEST REFUND",
  guideRefund = "GUIDE REFUND",
}

//payHere
declare global {
  interface Window {
    payhere: any;
  }
}

//interfaces
export interface NavigationBarProps {
  userRole: UserRoles;
}

export interface IReviewCard {
  avatar?: string;
  name: string;
  review: string;
  rate: number;
}
export interface IVehicleData {
  id: number;
  name: string;
  luggageSpace: string;
  price: number;
  image: string[];
}

export interface Language {
  level: string;
  language: string;
}

export interface IUserBioDataPublicProfile {
  id: string;
  profileImage: string;
  country: string;
  guidetype: string;
  name: string;
  aboutYou: string;
  experiencedYear: string;
  totalTours: string;
  price: number | string;
  languages: Language[];
  rate: number | string;
  reviewData: string[];
  ads: string[];
}

export interface ITourPackageData {
  date: number;
  note: string;
}

export interface ITourPackage {
  id: number;
  packageName: string;
  price: number;
  additionalNote: string;
  tourData: ITourPackageData[];
}
export interface IGuideTabSection {
  customersReview: IReviewCard[];
  tourPackageData: ITourPackage[];
  galleryImages: string[];
  vehicleData: IVehicleData[];
}
export interface FiltersProps {
  isFullView: boolean;
}

export interface IGuideCard {
  kd_id: number | string;
  image?: string;
  name: string;
  rate: number;
  type: string;
  showerDescription: string;
  price: number;
  isVehicleAvailable: boolean;
  experience: number;
}

export interface IHomePageData {
  galleryImages: string[];
  reviewCardData: IReviewCard[];
}
export interface IBookingInfo {
  name: string;
  reqid: number | string;
  total: number;
  reqdattime: string;
  isAccepted: boolean;
}

export interface IBookigaData {
  isBookingAccepted: boolean;
  isPayment1Success: boolean;
  isPayment2Success: boolean;
  paymentCode: number[] | string[];
  guestCountAdults: number;
  guestCountChild?: number;
  starDate: string;
  endDate: string;
  vehicleList: IVehicleData[];
  tourPackageData: ITourPackage[];
  guestNote: string;
  estimatePrice: number;
  guideNote: string;
  offer: number;
}
export interface IRequestCard {
  dataObject: IGuestDashBoard;
  isDisableInput: boolean;
}

export interface IGuestDashBoard {
  bookingAlerts: any;
  guideData: IGuideCard[];
  bookigaData: IBookigaData;
}

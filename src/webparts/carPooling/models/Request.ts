import { IRide } from "./Ride";

export enum RequestStatus {
    Approved = "Approved",
    Denied = "Denied",
    Pending = "Pending"
}

export interface IRequest {
    name: string;
    ride: IRide;
    status: RequestStatus;
    pickupPoint: string;
}
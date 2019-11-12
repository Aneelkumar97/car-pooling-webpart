export interface IRide {
    id: string;
    source: string;
    destination: string;
    viaPlaces: string[];
    noOfAvailableSeats: number;
    offeredBy: string;
    startDate: Date;
}
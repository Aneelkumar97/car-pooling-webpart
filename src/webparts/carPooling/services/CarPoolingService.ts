import { CommonService } from './CommonService';
import { IRide } from '../models/Ride';
import { IRequest, RequestStatus } from '../models/Request';

export class CarPoolingService {
    private commonService: CommonService;
    constructor() {
        this.commonService = new CommonService;
    }

    public getAvailableRides(): Promise<IRide[]> {
        return new Promise<IRide[]>((resolve, reject) => {
            this.commonService.getListItems('Rides', '', 'Id,ViaPlaces,StartDate,Source,Destination,AvailableSeats,OfferedBy/Title', 'OfferedBy').then((response) => {
                if (response["error"]) {
                    reject("Unable to get Data");
                }
                var rides: IRide[] = [];
                response.map((item) => {
                    rides.push({
                        id: Number(item.Id).toString(),
                        noOfAvailableSeats: item.AvailableSeats,
                        offeredBy: item.OfferedBy ? item.OfferedBy.Title : null,
                        viaPlaces: item.ViaPlaces.split(','),
                        startDate: new Date(item.StartDate),
                        destination: item.Destination,
                        source: item.Source
                    });
                });
                resolve(rides);
            });
        });
    }

    public getCurrentRideApprovedRequest(ride: IRide): Promise<IRequest[]> {
        return new Promise<IRequest[]>((resolve, reject) => {
            this.commonService.getListItems('Requests', `RideId eq '${ride.id}' and Status eq 'Approved'`, 'Title,Status,PickupPoint').then((response) => {
                if (response["error"]) {
                    reject("Unable to get Data");
                }
                var requests: IRequest[] = [];
                response.map((item) => {
                    requests.push({
                        name: item.Title,
                        pickupPoint: item.PickupPoint,
                        ride: ride,
                        status: item.Status as RequestStatus
                    });
                });
                resolve(requests);
            });
        });
    }
}
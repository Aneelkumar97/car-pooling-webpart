import * as React from 'react';
import styles from './styles.module.scss';
import { CarPoolingService } from '../../services/CarPoolingService';
import { IRide } from '../../models/Ride';
import { Spinner } from 'office-ui-fabric-react';
import RequestRideForm from './../requestForm';

export interface IRequestRideProps {
}

export interface IRequestRideState {
    loadingRides: boolean;
    rides: IRide[];
    isRequestRideFormOpen: boolean;
    selectedRide: IRide;
}

export default class RequestRide extends React.Component<IRequestRideProps, IRequestRideState> {
    private poolingService: CarPoolingService;
    constructor(props: IRequestRideProps) {
        super(props);
        this.state = {
            loadingRides: true,
            rides: undefined,
            isRequestRideFormOpen: false,
            selectedRide: null
        };
        this.poolingService = new CarPoolingService();
        this.openRequestForm = this.openRequestForm.bind(this);
        this.closeRequestForm = this.closeRequestForm.bind(this);
    }

    private getFormattedDate(date: Date): string {
        return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    private closeRequestForm() {
        this.setState({
            isRequestRideFormOpen: false
        });
    }

    private openRequestForm(ride: IRide) {
        this.setState({
            selectedRide: ride,
            isRequestRideFormOpen: true
        });
    }

    public componentDidMount() {
        this.poolingService.getAvailableRides().then((rides) => {
            this.setState({
                rides,
                loadingRides: false
            });
        });
    }

    public render(): React.ReactElement<IRequestRideProps> {
        return <div className={styles.requestRideContainer}>{
            this.state.loadingRides ?
                <Spinner /> :
                this.state.rides.length > 0 ?
                    <div className={styles.rides}>
                        <div className={`${styles.ride} ${styles.header}`}>
                            <div>Trip Date</div>
                            <div>Start Place</div>
                            <div>End Place</div>
                            <div>Offered By</div>
                            <div>Action</div>
                        </div>
                        {this.state.rides.map((ride) => <div className={styles.ride}>
                            <div>
                                {this.getFormattedDate(ride.startDate)}
                            </div>
                            <div>
                                {ride.source}
                            </div>
                            <div>
                                {ride.destination}
                            </div>
                            <div>
                                {ride.offeredBy}
                            </div>
                            <div onClick={() => this.openRequestForm(ride)}>
                                Request Ride
                            </div>
                        </div>)}
                    </div>
                    : <div>{`No rides available`}</div>
        }
            {
                this.state.isRequestRideFormOpen ? <RequestRideForm
                    closeForm={this.closeRequestForm}
                    ride={this.state.selectedRide} /> : null
            }
        </div>;
    }
}
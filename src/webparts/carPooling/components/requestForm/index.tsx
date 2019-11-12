import * as React from 'react';
import styles from './styles.module.scss';
import { CarPoolingService } from '../../services/CarPoolingService';
import { IRide } from '../../models/Ride';
import { Modal, TextField } from 'office-ui-fabric-react';

export interface IRequestRideFormProps {
    ride: IRide;
    closeForm: () => void;
}

export interface IRequestRideFormState {
    name: string;
    pickupPoint: string;
}

export default class RequestRideForm extends React.Component<IRequestRideFormProps, IRequestRideFormState> {
    private poolingService: CarPoolingService;
    constructor(props: IRequestRideFormProps) {
        super(props);
        this.state = {
            name: '',
            pickupPoint: ''
        };
        this.poolingService = new CarPoolingService();
        this.onNameChange = this.onNameChange.bind(this);
    }

    private onNameChange(value: string) {
        this.setState({
            name: value
        });
    }

    public componentDidMount() {
        this.poolingService.getCurrentRideApprovedRequest(this.props.ride).then((items) => {
            debugger;
        });
    }

    public render(): React.ReactElement<IRequestRideFormProps> {
        return <Modal
            isOpen={true}
            onDismiss={this.props.closeForm}
            isBlocking={true}
            className={styles.requestForm}>
            <div>
                <div className={styles.field}>
                    <div className={styles.label}>Name of the Passenger</div>
                    <TextField
                        onChanged={this.onNameChange}
                        value={this.state.name}
                    />
                </div>
            </div>
        </Modal>;
    }
}
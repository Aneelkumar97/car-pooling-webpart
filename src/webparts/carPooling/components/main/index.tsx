import * as React from 'react';
import OfferRide from './../offerRide';
import RequestRide from './../requestRide';
import styles from './styles.module.scss';

enum AvailableOptions {
  offerRide = "Offer a Ride",
  requestRide = "Request a Ride"
}

export interface IMainProps {
}

export interface IMainState {
  selectedOption: AvailableOptions;
}

export default class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      selectedOption: AvailableOptions.requestRide
    };
  }

  public render(): React.ReactElement<IMainProps> {
    return <div className={styles.main}>
      {
        this.state.selectedOption ?
          this.state.selectedOption == AvailableOptions.offerRide ?
            <OfferRide /> :
            <RequestRide />
          : <div>Select one option</div>
      }
    </div>;
  }
}

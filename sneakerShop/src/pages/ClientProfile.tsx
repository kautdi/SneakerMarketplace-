import { FC } from 'react';
import InfoForm from '../components/ClientProfile/InfoForm';
import DeliveryInfo from '../components/ClientProfile/DeliveryInfo';
import History from '../components/ClientProfile/History';

const ClientProfile: FC = () => {
    return (
        <div className="client-profile">
            <InfoForm/>
            <div className="delivery-history client-profile__delivery-history">
                <DeliveryInfo/>
                <History/>
            </div>
        </div>
    );
}

export default ClientProfile


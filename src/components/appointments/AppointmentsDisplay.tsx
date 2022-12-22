import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui';

import { useStoreContext } from '../../contexts/StoreContext';

export default function AppointmentsDisplay({
  children,
  ...restProps
}: Appointments.AppointmentProps) {
  const { appointmentsDispatch } = useStoreContext();
  
  const handleAppointmentClick = ({ data }: AppointmentModel) => {
    appointmentsDispatch.setAppointmentForm({ visible: true, data });
  };

  return (
    <Appointments.Appointment
      style={{ opacity: restProps.data.isFreeSlot ? 0.5 : 1 }}
      onClick={ handleAppointmentClick }
      { ...restProps }
    >
      { children }
    </Appointments.Appointment>
  )
}

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { ViewState, AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  DayView,
  Scheduler,
  Appointments,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';


// COMPONENTS
import AppointmentsDisplay from './AppointmentsDisplay';
import AppointmentFormComponent from './AppointmentForm';

// CONTEXTS/UTILS
import { useStoreContext } from '../../contexts/StoreContext';
import { Appointments as AppointmentsType } from '../../utils/types/appointments.types';

const CURRENT_DATE = '2021-12-06';

const AppointmentsContainer = styled.div``;

export default function Calendar() {
  const [appointments, setAppointments] = useState<AppointmentsType[] | AppointmentModel[]>([]);
  const {
    appointmentsStore,
    appointmentsDispatch
  } = useStoreContext();
  const { appointments: storeAppointments, appointmentForm } = appointmentsStore;

  useEffect(() => {
    setAppointments(storeAppointments);
  }, [storeAppointments])
  
  const handleVisibilityChange = (visible: boolean) => {
    appointmentsDispatch.setAppointmentForm({ visible });
  };

  return (
    <Paper>
      <Scheduler data={ appointments } height="auto">
        <ViewState currentDate={ CURRENT_DATE } />
        <DayView startDayHour={ 9 } endDayHour={ 17 } />
        <Appointments
          appointmentComponent={ AppointmentsDisplay }
        />
        <AppointmentForm
          overlayComponent={ AppointmentFormComponent }
          visible={ appointmentForm.visible }
          appointmentData={ appointmentForm.data }
          onVisibilityChange={ handleVisibilityChange }
        />
      </Scheduler>
    </Paper>
  )
}

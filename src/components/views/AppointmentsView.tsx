import { useEffect } from 'react';
import styled from 'styled-components';

import Calendar from '../appointments/Calendar';

// CONTEXTS/UTILS
import { useStoreContext } from '../../contexts/StoreContext';

const AppointmentsViewContainer = styled.div``;

export default function AppointmentsView() {
  const { appointmentsDispatch } = useStoreContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      appointmentsDispatch.populateAppointments();
    };

    fetchAppointments();
  }, []);

  return (
    <AppointmentsViewContainer>
      <Calendar />
    </AppointmentsViewContainer>
  )
}

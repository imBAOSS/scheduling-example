import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from './components/shared/Layout';
import AppointmentsView from './components/views/AppointmentsView';

// CONTEXTS/UTILS
import { useStoreContext } from './contexts/StoreContext';
import { ClinicInfo } from './utils/types/appointments.types';

const AppContainer = styled.div`
  min-height: 100vh;
`;

export default function App() {
  const [clinic, setClinic] = useState({})
  const { appointmentsStore, appointmentsDispatch } = useStoreContext();
  const { clinicInfo } = appointmentsStore;

  useEffect(() => {
    appointmentsDispatch.populateClinicInfo();
  }, []);

  useEffect(() => {
    setClinic(clinicInfo);
  }, [clinicInfo])

  return (
    <AppContainer>
      <Layout withHeader headerTitle={ clinic?.name }>
        <AppointmentsView />
      </Layout>
    </AppContainer>
  );
}

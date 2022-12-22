import {
  createContext,
  useContext,
  useMemo,
  ReactElement
} from 'react';

import {
  createAppointmentDispatches,
  useAppointmentsReducer
} from '../store/appointments';
import {
  AppointmentsState,
  AppointmentsDispatches
} from '../utils/types/appointments.types';

interface IStoreContext {
  appointmentsStore: AppointmentsState;
  appointmentsDispatch: AppointmentsDispatches;
};

interface IStoreProviderProps {
  children: ReactElement | ReactElement[]
}

const StoreContext = createContext<IStoreContext>({} as IStoreContext);

export default function StoreProvider({ children }: IStoreProviderProps) {
  const [appointmentState, appointmentDispatch] = useAppointmentsReducer();
  const appointmentsDispatches = useMemo<AppointmentsDispatches>(() => (
    createAppointmentDispatches(appointmentDispatch)
  ), [appointmentDispatch]);
  
  return (
    <StoreContext.Provider value={{
      appointmentsStore: appointmentState,
      appointmentsDispatch: appointmentsDispatches
    }}>
      { children }
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext);
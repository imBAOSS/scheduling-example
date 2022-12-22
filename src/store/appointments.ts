import moment from 'moment'
import { useReducer } from 'react';

import { fetchAppointments, fetchClinicInfo } from '../api/appointments';
import {
  AppointmentsAction,
  AppointmentsDispatches,
  AppointmentsState,
  FetchedAppointments,
  FetchedClinicInfo,
  Employee,
  AppointmentForm,
  AppointmentsMap,
  Appointments
} from '../utils/types/appointments.types';
import generateAppointmentsMap from '../utils/js/generateAppointmentsMap';
import generateTimeslotsArr, { TIME_FORMAT, APPT_INTERVAL, APPT_TIME_UNIT } from '../utils/js/generateTimeslotsArr';

export const createAppointmentDispatches: ((f: (a: AppointmentsAction) => void) => AppointmentsDispatches) = (appointmentsDispatch) => ({
  setLoading: (isLoading: boolean) => {
    appointmentsDispatch({
      type: 'SET_LOADING',
      payload: isLoading
    });
  },

  setAppointmentForm: (data: AppointmentForm) => {
    appointmentsDispatch({
      type: 'SET_APPOINTMENT_FORM',
      payload: data
    });
  },

  populateClinicInfo: async () => {
    const fetchedClinicInfo: FetchedClinicInfo[] = await fetchClinicInfo();
    
    appointmentsDispatch({
      type: 'POPULATE_CLINIC',
      payload: fetchedClinicInfo[0] // We only want Arroyo Vet Clinic for the purpose of this assessment
    });
  },
  
  populateAppointments: async () => {
    const fetchedAppointments: FetchedAppointments[] = await fetchAppointments();

    appointmentsDispatch({
      type: 'POPULATE_APPOINTMENTS',
      payload: fetchedAppointments
    });
  },
  
  addAppointment: async () => {
    appointmentsDispatch({
      type: 'ADD_APPOINTMENT',
      payload: ''
    });
  }
});

const initialAppointmentState: AppointmentsState = {
  loading: false,
  appointmentForm: { visible: false },
  clinicInfo: undefined,
  appointments: [],
};

const reducer: (state: AppointmentsState, action: AppointmentsAction) => AppointmentsState = (state = initialAppointmentState, action: AppointmentsAction) => {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_APPOINTMENT_FORM':
      return {
        ...state,
        appointmentForm: action.payload
      };

    case 'POPULATE_CLINIC':
      const { employees, ...restInfo } = action.payload;
      
      return {
        ...state,
        clinicInfo: {
          ...restInfo,
          employees: {
            technician: employees.filter((employee: Employee) =>
              employee.active && employee.clinic_role === 'technician'
            ),
            veterinarian: employees.filter((employee: Employee) =>
              employee.active && employee.clinic_role === 'veterinarian'
            ),
          }
        }
      };
    
    case 'POPULATE_APPOINTMENTS':
      const appointmentsMap: AppointmentsMap = generateAppointmentsMap(action.payload);
      const timeSlots: string[] = generateTimeslotsArr(
        '2021-12-06T09:00:00-08:00',
        '2021-12-06T17:00:00-08:00'
      );

      /**
       * If an appointment already exists, add that appointment to state,
       * otherwise, add a time slot for new appointment
       */
      const appointments = timeSlots.map((timeSlot: string) => {
        if (timeSlot in appointmentsMap) {
          return appointmentsMap[timeSlot];
        }

        return {
          title: 'Add an appointment',
          startDate: new Date(timeSlot),
          endDate: new Date(
            moment(timeSlot)
              .add(APPT_INTERVAL, APPT_TIME_UNIT)
              .format(TIME_FORMAT)
          ),
          isFreeSlot: true
        }
      })

      return {
        ...state,
        appointments
      };

    case 'ADD_APPOINTMENT':
      return { ...state };

    default:
      return { ...state };
  }
}

export const useAppointmentsReducer = () => useReducer(reducer, initialAppointmentState);
import moment from 'moment';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';

import titleCase from './snakeToTitleCase';
import { FetchedAppointments, AppointmentsMap } from "../types/appointments.types";

export default function generateAppointmentsMap(appts: FetchedAppointments[]): AppointmentsMap {
  const appointmentsMap: AppointmentsMap = {};
  
  appts.forEach((app: FetchedAppointments) => {
    const {
      id,
      start_time,
      client_first_name,
      client_last_name,
      client_phone_number,
      client_email,
      patient_name,
      patient_breed,
      patient_dob,
      patient_color,
      vet_id,
      appointment_type,
      status,
      staff_notes
    } = app;
    const endDate = moment(start_time)
      .add(20, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ')

    appointmentsMap[start_time] = {
      id,
      title: `${ client_first_name} ${ client_last_name } | ${ patient_name } | ${ titleCase(appointment_type) }`,
      startDate: new Date(start_time),
      endDate: new Date(endDate),
      clientFirstName: client_first_name,
      clientLastName: client_last_name,
      clientPhoneNumber: client_phone_number,
      clientEmail: client_email,
      patientName: patient_name,
      patientBreed: patient_breed,
      patientDOB: patient_dob,
      patientColor: patient_color,
      vetId: vet_id,
      appointmentType: appointment_type,
      status,
      staffNotes: staff_notes
    } as AppointmentModel;
  });

  return appointmentsMap;
};
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export interface AppointmentForm {
  visible: boolean;
  data?: AppointmentModel;
};

export type Employee = {
  id: string;
  short_name: string;
  first_name: string;
  last_name: string;
  clinic_role: string;
  active: boolean;
  clinicId: string;
};

export interface FetchedClinicInfo {
  id: string;
  name: string;
  status: string;
  email: string;
  phone: string;
  employees: Employee[];
}

export interface FetchedAppointments {
  start_time: string;
  client_first_name: string;
  client_last_name: string;
  client_phone_number: string;
  client_email: string;
  patient_name: string;
  patient_breed: string;
  patient_dob: string;
  patient_color: string;
  vet_id: string;
  staff_notes: string;
  timezone: string;
  appointment_type: string;
  status: string;
  id: string;
  clinic_id: string;
}

export interface Appointments extends AppointmentModel {
  appointmentType: string;
  clientEmail: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhoneNumber: string;
  patientBreed: string;
  patientColor: string;
  patientDOB: string;
  patientName: string;
  staffNotes: string;
  status: string;
  vetId: string;
};

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
};

interface SetAppointmentFormAction {
  type: 'SET_APPOINTMENT_FORM';
  payload: AppointmentForm
};

interface PopulateClinicInfoAction {
  type: 'POPULATE_CLINIC';
  payload: FetchedClinicInfo;
};

interface PopulateAppointmentsAction {
  type: 'POPULATE_APPOINTMENTS';
  payload: FetchedAppointments[];
};

interface AddAppointmentAction {
  type: 'ADD_APPOINTMENT';
  payload: string;
};

export type AppointmentsAction =
  SetLoadingAction
  | SetAppointmentFormAction
  | PopulateClinicInfoAction
  | PopulateAppointmentsAction
  | AddAppointmentAction;

export interface AppointmentsDispatches {
  setLoading: (isLoading: boolean) => void;
  setAppointmentForm: (formData: AppointmentForm) => void;
  populateClinicInfo: () => Promise<void>;
  populateAppointments: () => Promise<void>;
  addAppointment: () => void;
};

export type ClinicInfo = {
  id: string;
  name: string;
  status: string;
  email: string;
  phone: string;
  employees: {
    technician: Employee[];
    veterinarian: Employee[];
  }
};

export interface AppointmentsState {
  loading: boolean;
  appointmentForm: AppointmentForm;
  clinicInfo?: ClinicInfo;
  appointments: Appointments[] | AppointmentModel[];
};

export type AppointmentsMap = {
  [key: string]: AppointmentModel;
}
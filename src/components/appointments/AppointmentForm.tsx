import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connectProps } from '@devexpress/dx-react-core';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useStoreContext } from '../../contexts/StoreContext';
import { TIME_FORMAT } from '../../utils/js/generateTimeslotsArr';

const APPT_TYPE = [
  {
    label: 'Annual Checkup',
    value: 'annual_checkup'
  },
  {
    label: 'Sick',
    value: 'sick'
  },
  {
    label: 'Recheck',
    value: 'recheck'
  },
  {
    label: 'New Patient',
    value: 'new_patient'
  },
  {
    label: 'Tech Appointment',
    value: 'tech_appt'
  },
];

const STATUS = [
  {
    label: 'Booked',
    value: 'booked'
  },
  {
    label: 'Checked In',
    value: 'checked_in'
  },
  {
    label: 'No Show',
    value: 'no_show'
  },
];

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0.5rem 0.5rem 1.5rem;
`;

const HeaderText = styled.h1``;

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
`;

const PrimaryButtonGroup = styled.div`
  button:first-of-type {
    margin-right: 8px;;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
`;

const ClientInfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;

  > .MuiTextField-root {
    margin-bottom: 16px;
  }
`;

const RowContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

  > * {
    flex: 1;

    &:first-of-type {
      margin-right: 8px;
    }
  }
`;

const PatientInfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;

  > .MuiTextField-root {
    margin-bottom: 16px;
  }
`;

const PatientInfoSubcontainer = styled.div`
  display: flex;
  margin-bottom: 16px;

  > * {
    flex: 1;

    &:first-of-type {
      height: 40px;
      margin-right: 8px;

      .MuiOutlinedInput-root {
        height: 40px;
      }
    }
  }
`;

const AppointmentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;

  > .MuiTextField-root {
    margin-bottom: 16px;
  }
`;

export default function AppointmentFormComponent({
  children,
  fullSize,
  onHide,
  target,
  visible
}: AppointmentForm.OverlayProps) {
  const inputRef = useRef<{ [key: string]: any }>({})
  const { appointmentsStore, appointmentsDispatch } = useStoreContext();
  const { appointmentForm, clinicInfo } = appointmentsStore;
  const { data: formData } = appointmentForm;
  const [title, setTitle] = useState<string|undefined>('')

  useEffect(() => {
    if (!formData?.isNewSlot) {
      setTitle(formData?.title);
    }
  }, []);

  useEffect(() => {
    const {
      clientFirstName,
      clientLastName,
      patientName,
      appointmentType
    } = inputRef.current;

    setTitle(`${ clientFirstName?.value } ${ clientLastName?.value } | ${ patientName?.value } | ${ appointmentType?.value }`);
  }, [
    inputRef.current?.clientFirstName?.value,
    inputRef.current?.clientLastName?.value,
    inputRef.current?.patientName?.value,
    inputRef.current?.appointmentType?.value
  ]);
  
  return (
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <AppointmentForm.Overlay
        visible={ visible }
        fullSize={ fullSize }
        onHide={ onHide }
        target={ target }
      >
        <HeaderContainer>
          <HeaderText>Appointment Details</HeaderText>
          <IconButton onClick={ onHide }>
            <Close />
          </IconButton>
        </HeaderContainer>

        <TitleContainer>
          <TextField
            disabled
            fullWidth
            id="title"
            label="Appointment Title"
            placeholder="Appointment Title"
            size="small"
            value={ title }
          />
        </TitleContainer>

        <Divider textAlign="left">Client Information</Divider>

        <ClientInfoInputContainer>
          <RowContainer>
            <TextField
              inputRef={ el => inputRef.current['clientFirstName'] = el }
              id="client-first-name"
              label="Client First Name"
              placeholder="Client First Name"
              size="small"
              defaultValue={ formData?.clientFirstName }
            />
            <TextField
              inputRef={ el => inputRef.current['clientLastName'] = el }
              id="client-last-name"
              label="Client Last Name"
              placeholder="Client Last Name"
              size="small"
              defaultValue={ formData?.clientLastName }
            />
          </RowContainer>
          <TextField
              inputRef={ el => inputRef.current['clientEmail'] = el }
              id="client-email"
              label="Client Email"
              placeholder="Client Email"
              size="small"
              defaultValue={ formData?.clientEmail }
            />
            <TextField
              inputRef={ el => inputRef.current['clientPhoneNumber'] = el }
              id="client-phone-number"
              label="Client Phone Number"
              placeholder="Client Phone Number"
              size="small"
              defaultValue={ formData?.clientPhoneNumber }
            />
        </ClientInfoInputContainer>

        <Divider textAlign="left">Patient Information</Divider>

        <PatientInfoInputContainer>
          <TextField
            inputRef={ el => inputRef.current['patientName'] = el }
            id="patient-name"
            label="Patient Name"
            placeholder="Patient Name"
            size="small"
            defaultValue={ formData?.patientName }
          />
          <TextField
            inputRef={ el => inputRef.current['patientBreed'] = el }
            id="patient-breed"
            label="Patient Breed"
            placeholder="Patient Breed"
            size="small"
            defaultValue={ formData?.patientBreed }
          />
          <DatePicker
            inputRef={ el => inputRef.current['patientDOB'] = el }
            label="Patient Date of Birth"
            value={ formData?.patientDOB }
            onChange={(newValue) => { inputRef.current['patientDOB'].value = newValue.format(TIME_FORMAT) }}
            renderInput={(params) =>
              <TextField { ...params } />
            }
          />
          <TextField
            inputRef={ el => inputRef.current['patientColor'] = el }
            id="patient-color"
            label="Patient Color"
            placeholder="Patient Color"
            size="small"
            defaultValue={ formData?.patientColor }
          />
        </PatientInfoInputContainer>

        <Divider textAlign="left">Appointment Details</Divider>

        <AppointmentDetailsContainer>
          <RowContainer>
            <TextField
              select
              inputRef={ el => inputRef.current['appointmentType'] = el }
              id="appointment-type"
              label="Appointment Type"
              placeholder="Appointment Type"
              size="small"
              defaultValue={ formData?.appointmentType }
            >
              {
                APPT_TYPE.map((option) => (
                  <option key={ option.value } value={ option.value }>
                    { option.label }
                  </option>
                ))
              }
            </TextField>
            <TextField
              select
              inputRef={ el => inputRef.current['status'] = el }
              id="status"
              label="Status"
              placeholder="Status"
              size="small"
              defaultValue={ formData?.status }
            >
              {
                STATUS.map((option: { value: string, label: string }) => (
                  <option key={ option.value } value={ option.value }>
                    { option.label }
                  </option>
                ))
              }
            </TextField>
          </RowContainer>
          <RowContainer>
            <TextField
              select
              inputRef={ el => inputRef.current['veterinarian'] = el }
              id="veterinarian"
              label="Veterinarian"
              placeholder="Veterinarian"
              size="small"
              defaultValue={ formData?.vetId }
            >
              {
                clinicInfo?.employees.veterinarian.map(vet =>
                  <option key={ vet.id } value={ vet.id }>
                    { `${ vet.short_name } - ${vet.first_name} ${vet.last_name}` }
                  </option>
                )
              }
            </TextField>
            <TextField
              select
              inputRef={ el => inputRef.current['technician'] = el }
              id="technician"
              label="Technician"
              placeholder="Technician"
              size="small"
              defaultValue={ formData?.techId }
            >
              {
                clinicInfo?.employees.technician.map(tech =>
                  <option key={ tech.id } value={ tech.id }>
                    { `${ tech.short_name } - ${tech.first_name} ${tech.last_name}` }
                  </option>
                )
              }
            </TextField>
          </RowContainer>
          <TextField
            multiline
            inputRef={ el => inputRef.current['staffNotes'] = el }
            id="staff-notes"
            label="Staff Notes"
            placeholder="Staff Notes"
            size="small"
            defaultValue={ formData?.staffNotes }
          />
        </AppointmentDetailsContainer>

        <FooterContainer>
          <Button variant="outlined" color="error">Delete</Button>
          <PrimaryButtonGroup>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save</Button>
          </PrimaryButtonGroup>
        </FooterContainer>
      </AppointmentForm.Overlay>
    </LocalizationProvider>
  )
}

const API_URL: string = 'https://61a576964c822c001704220b.mockapi.io/api/v1/'

export const fetchAppointments = async () => {
  try {
    const res = await fetch(`${ API_URL }/clinics/1/appointment`);
    const data = await res.json();

    return data;
  } catch(err) {
    console.error(err);
  }
}

export const fetchClinicInfo = async () => {
  try {
    const res = await fetch(`${ API_URL }/clinics`);
    const data = await res.json();

    return data;
  } catch(err) {
    console.error(err);
  }
}
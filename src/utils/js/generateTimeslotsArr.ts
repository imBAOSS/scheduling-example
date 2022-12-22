import moment from 'moment';

export const APPT_INTERVAL = 20;
export const APPT_TIME_UNIT = 'minutes';
export const TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

export default function generateTimeslotsArr(start: string, end: string): string[] {
  let timeSlots: string[] = [];
  let currentTime: string = start;

  while (currentTime !== end) {
    timeSlots.push(currentTime);
    currentTime = moment(currentTime)
      .add(APPT_INTERVAL, APPT_TIME_UNIT)
      .format(TIME_FORMAT);
  };

  return timeSlots;
};
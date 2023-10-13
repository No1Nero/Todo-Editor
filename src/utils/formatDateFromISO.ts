import { hoursMinLength } from "../constants/timeConstants";

export const formatDateFromISO = (dateISO: string ) => {
  const date = new Date(dateISO).toLocaleDateString('ru-RU');
  const time = new Date(dateISO).toLocaleTimeString('ru-RU').slice(0, hoursMinLength);
  
  return `${date} ${time}`;
};

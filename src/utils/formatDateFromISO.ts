export const formatDateFromISO = (dateISO: string ) => {
  const hoursMinLength = 5;
  const date = new Date(dateISO).toLocaleDateString('ru-RU');
  const time = new Date(dateISO).toLocaleTimeString('ru-RU').slice(0, hoursMinLength);
  
  return `${date} ${time}`;
};

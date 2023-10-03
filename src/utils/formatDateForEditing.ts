export const formatDateForEditing = (date: string) => {
    const parts = date.split(' ');
    const dateParts = parts[0].split('.');
    const timeParts = parts[1].split(':');

    const formattedYear = parseInt(dateParts[2]);
    const formattedMonth = parseInt(dateParts[1]) - 1;
    const formattedDay = parseInt(dateParts[0]);
    const formattedHour = parseInt(timeParts[0]);
    const formattedMinute = parseInt(timeParts[1]);
    const formattedDate = new Date(formattedYear, formattedMonth, formattedDay, formattedHour, formattedMinute);

    formattedDate.setHours(formattedDate.getHours() + 3);

    return formattedDate.toISOString().slice(0, 16);
};

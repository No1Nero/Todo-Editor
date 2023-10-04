export const getLocalTimeFromISO = (datetime: Date) => {
    const date = new Date(datetime);
    const milisecIn1Sec = 1000;
    const secIn1Min = 60;
    const datetimeWithTimeDifference = +date - new Date().getTimezoneOffset() * secIn1Min * milisecIn1Sec;

    return new Date(datetimeWithTimeDifference).toISOString();
};

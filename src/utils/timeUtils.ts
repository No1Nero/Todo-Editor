import { fiveMins, oneDay } from "../constants/timeConstants";

export const addFiveMinutes = (date: Date) => {
    return new Date(date.setMinutes(date.getMinutes() + fiveMins));
};

export const isSameDay = (date: Date, currentDate: Date) => {
    return date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();
};

export const startOfDay = (date: Date) => {
    return new Date(date.toDateString());
};

export const addOneDay = (date: Date) => {
    return new Date(date.setDate(date.getDate() + oneDay));
};

export const endOfDay = (date: Date) => {
    return new Date(date.setHours(23, 59, 59, 999));
};

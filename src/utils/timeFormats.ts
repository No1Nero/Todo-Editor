import { addFiveMinutes, addOneDay, endOfDay, isSameDay, startOfDay } from "./timeUtils";

export const getMinDate = (date: Date | null): Date => {
    const currentDate = new Date();

    if (!date) {
        return addFiveMinutes(currentDate);
    }

    if (isSameDay(date, currentDate)) {
        return date > addFiveMinutes(currentDate) ? addFiveMinutes(currentDate) : date;
    }

    if (date > currentDate) {
        return startOfDay(date);
    }

    return addFiveMinutes(currentDate);
}

export const getMaxDate = (date: Date) => {
    const nextDay = addOneDay(date);
    return endOfDay(nextDay);
}

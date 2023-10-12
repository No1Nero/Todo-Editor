import { addFiveMinutes, addOneDay, endOfDay, isSameDay, startOfDay } from "./timeUtils";

export const getMinDate = (date: Date | null): Date => {
    const currentDate = new Date();

    if (!date) {
        return addFiveMinutes(currentDate);
    }

    const currentDayStart = startOfDay(currentDate);
    const dateDayStart = startOfDay(date);

    if (isSameDay(date, currentDate)) {
        return addFiveMinutes(currentDate);
    }

    if (dateDayStart > currentDayStart) {
        return dateDayStart;
    }

    return addFiveMinutes(currentDate);
}

export const getMaxDate = (date: Date) => {
    const nextDay = addOneDay(date);
    return endOfDay(nextDay);
}

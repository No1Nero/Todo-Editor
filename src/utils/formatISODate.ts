export const formatISODate = (date: string) => {
    const datetimeLength = 16;
    return date.slice(0, datetimeLength);
};

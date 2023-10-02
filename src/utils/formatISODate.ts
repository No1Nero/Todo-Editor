export const formatISODate = (date: Date) => {
    return date.toISOString().slice(0, 16)
};

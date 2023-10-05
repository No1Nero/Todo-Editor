export const validateSaveButton = (expires: Date | null, inputValue: string) => {
    return (!expires || !inputValue.trim());
};

export const validateSaveButton = (expires: string, inputValue: string) => {
    return (!expires || !inputValue.trim());
};

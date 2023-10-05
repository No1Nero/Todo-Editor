export const formatInputText = (input: string) => {
    const formattedInputText = input.replace(/[{}+/@#$%^&*|;:<>=_]/g, '');

    return formattedInputText;
};

export const formatInputText = (input: string) => {
    const formattedInputText = input.replace(/[{}+/@#$%^&*|;:<>=_]/g, '');
    const maxInputLength = 70;
    if (formattedInputText.length > maxInputLength) {
      formattedInputText.slice(0, maxInputLength);
    }
    return formattedInputText;
};

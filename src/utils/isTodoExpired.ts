export const isTodoexpired = (expiration: string) => {
    const date = new Date().toISOString();
    return date >= expiration;
};

export const setLocalStorageData = (title: string, data: string) => {
    localStorage.setItem(`${title}`, JSON.stringify(data));
};

export const getLocalStorageData = (title: string) => {
    const data = localStorage.getItem(`${title}`);
    return data !== null ? JSON.parse(data) : '';
};

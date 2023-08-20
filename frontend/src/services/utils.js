export const getDateAsLocale = (date) => {
    const utcDate = new Date(date); //Converting UTC date string to Date
    const localDateTime = utcDate.toLocaleString();
    return localDateTime;
}
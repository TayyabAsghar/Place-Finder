import { parseISO, format } from 'date-fns';

export const toTitleCase = (str: string) => str.replace(/([^\W_]+[^\s-]*) */g, txt =>
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export const getInitials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part.slice(0, 1)).join('');

export const parseDate = (date: string | Date) => {
    if (typeof date === 'string')
        return format(parseISO(date), 'EEE MMM dd yyyy');
};

export const moveDays = (date: string | Date, days: number) => {
    const currentDate = new Date(date);
    return new Date(currentDate.setDate(currentDate.getDate() + days));
};

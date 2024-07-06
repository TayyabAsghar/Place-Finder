export const toTitleCase = (str: string) =>
    str.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export const getInitials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part.slice(0, 1)).join('');

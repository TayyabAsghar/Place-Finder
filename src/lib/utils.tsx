export function toTitleCase(str: string) {
    return str.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
};
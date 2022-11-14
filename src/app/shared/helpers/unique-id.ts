export const generateUniqueId = (prefix = 'id'): string => `${prefix}${Math.floor(Math.random() * Date.now())}`;

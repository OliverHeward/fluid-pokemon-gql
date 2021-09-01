// Re-usable reducer object
export const updateObject = (oldObject, updatedProperties) => {
    return { 
        ...oldObject,
        ...updatedProperties
    }
}

export const sanitizeString = (text) => {
    text = text.replace(/-/g, " ");

    return text;
}

export const sanitizeSentenceCase = (text) => {
    text = sanitizeString(text);
    text = text.charAt(0).toUpperCase() + text.slice(1); 

    return text;
}
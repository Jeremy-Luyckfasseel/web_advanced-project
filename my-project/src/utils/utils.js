/*Algemene hulpfuncties voor de Dog Explorer applicatie*/

/*Vertraging functie - wacht een bepaalde tijd*/
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/*Formatteert een datum naar een leesbaar formaat*/
export const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
};

/*Genereert een unieke ID*/
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/*Valideert een email-adres*/
export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

/*Debounce functie - beperkt het aantal keer dat een functie wordt aangeroepen*/
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/*Maakt een eerste letter van een string hoofdletter*/
export const capitalize = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/*Transformeert een object met queries naar een query string*/
export const buildQueryString = (params) => {
    return Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

/*Trunceert een tekst tot een bepaalde lengte*/
export const truncateText = (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.slice(0, length) + '...';
};

/*Sorteert een array van objecten op een property*/
export const sortArrayByProperty = (array, key, direction = 'asc') => {
    return [...array].sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];
        
        // String vergelijking
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
            
            if (direction === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        }
        
        // Numerieke vergelijking
        if (direction === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });
};
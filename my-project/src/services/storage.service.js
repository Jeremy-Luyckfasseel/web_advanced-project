/*Service voor het opslaan en ophalen van data in localStorage*/

// Constanten voor localStorage keys
const FAVORITES_KEY = 'dogExplorer_favorites';
const NOTES_KEY = 'dogExplorer_notes';
const SETTINGS_KEY = 'dogExplorer_settings';

/*Haalt de lijst van favoriete hondenrassen op uit localStorage*/
export const getFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

/*Voegt een hondenras toe aan de favorieten*/
export const addFavorite = (breed) => {
    const favorites = getFavorites();
    
    // Controleer of de hond al in favorieten staat
    const exists = favorites.some(fav => fav.id === breed.id);
    
    if (!exists) {
        favorites.push({
            ...breed,
            dateAdded: new Date().toISOString()
        });
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

/*Verwijdert een hondenras uit de favorieten*/
export const removeFavorite = (breedId) => {
    let favorites = getFavorites();
    favorites = favorites.filter(breed => breed.id !== breedId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

/*Controleert of een hondenras in de favorieten staat*/
export const isFavorite = (breedId) => {
    const favorites = getFavorites();
    return favorites.some(breed => breed.id === breedId);
};

/*Haalt alle gebruikersnotities op uit localStorage*/
export const getNotes = () => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : {};
};

/*Slaat een notitie op voor een specifiek hondenras*/
export const saveNote = (breedId, note) => {
    const notes = getNotes();
    notes[breedId] = note;
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

/*Verwijdert een notitie voor een specifiek hondenras*/
export const removeNote = (breedId) => {
    const notes = getNotes();
    delete notes[breedId];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

/*Haalt een notitie op voor een specifiek hondenras*/
export const getNote = (breedId) => {
    const notes = getNotes();
    return notes[breedId] || null;
};

/*Haalt gebruikersinstellingen op uit localStorage*/
export const getUserSettings = () => {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {
        theme: 'light',
        language: 'nl',
        itemsPerPage: 12
    };
};

/*Slaat gebruikersinstellingen op in localStorage*/
export const saveUserSettings = (settings) => {
    // Merge met bestaande instellingen
    const currentSettings = getUserSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
};
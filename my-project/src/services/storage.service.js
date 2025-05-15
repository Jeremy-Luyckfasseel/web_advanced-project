/*Service voor het opslaan en ophalen van data in localStorage*/

// Constanten voor localStorage keys
const FAVORITES_KEY = 'dogExplorer_favorites';
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
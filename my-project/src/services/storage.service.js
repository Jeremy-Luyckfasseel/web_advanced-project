/*Service voor het opslaan en ophalen van data in localStorage*/

// Constanten voor localStorage keys
const FAVORITES_KEY = 'dogExplorer_favorites';

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
        
        // Trigger een storage event zodat andere componenten weten dat er iets veranderd is
        window.dispatchEvent(new Event('favoritesUpdated'));
    }
};

/*Verwijdert een hondenras uit de favorieten*/
export const removeFavorite = (breedId) => {
    let favorites = getFavorites();
    favorites = favorites.filter(breed => breed.id !== breedId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    
    // Trigger een storage event zodat andere componenten weten dat er iets veranderd is
    window.dispatchEvent(new Event('favoritesUpdated'));
};

/*Controleert of een hondenras in de favorieten staat*/
export const isFavorite = (breedId) => {
    const favorites = getFavorites();
    return favorites.some(breed => breed.id === breedId);
};

/*Haalt default instellingen op*/
export const getUserSettings = () => {
    return {
        theme: 'light',
        language: 'nl',
        itemsPerPage: 12
    };
};

/*Placeholder functie voor compatibiliteit*/
export const saveUserSettings = (settings) => {
    // Deze functie doet niets meer, maar blijft behouden voor compatibiliteit
    // met bestaande code dat mogelijk deze functie aanroept
};
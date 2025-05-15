/*Service voor API-verzoeken naar de Dog API
 *API-documentatie: https://dog.ceo/dog-api/*/

// Basis-URL voor de Dog API
const BASE_URL = 'https://dog.ceo/api';

/*Haalt data op van de Dog API*/
const fetchFromAPI = async (endpoint) => {
    try {
        // URL maken
        const url = `${BASE_URL}${endpoint}`;
        
        console.log(`Data ophalen van ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API-verzoek mislukt met status ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fout bij het ophalen van data van API:', error);
        throw error;
    }
};

/*Haalt een lijst van alle hondenrassen op*/
export const getAllBreeds = async () => {
    const response = await fetchFromAPI('/breeds/list/all');
    return response.message;
};

/*Haalt een willekeurige afbeelding op van een specifiek hondenras*/
export const getRandomBreedImage = async (breed, subBreed = null) => {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    const response = await fetchFromAPI(`/breed/${breedPath}/images/random`);
    return response.message;
};


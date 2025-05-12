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

/*Haalt meerdere willekeurige afbeeldingen op van een specifiek hondenras*/
export const getMultipleRandomBreedImages = async (breed, subBreed = null, count = 3) => {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    const response = await fetchFromAPI(`/breed/${breedPath}/images/random/${count}`);
    return response.message;
};

/*Haalt alle afbeeldingen op van een specifiek hondenras*/
export const getAllBreedImages = async (breed, subBreed = null) => {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    const response = await fetchFromAPI(`/breed/${breedPath}/images`);
    return response.message;
};

/*Haalt een lijst van subrassen op voor een specifiek ras*/
export const getSubBreeds = async (breed) => {
    const response = await fetchFromAPI(`/breed/${breed}/list`);
    return response.message;
};

/*Haalt een willekeurige afbeelding op van een willekeurig hondenras*/
export const getRandomImage = async () => {
    const response = await fetchFromAPI('/breeds/image/random');
    return response.message;
};
/*BreedsPage component - toont een lijst met hondenrassen*/

import { getAllBreeds, getRandomBreedImage } from '../services/api.service.js';
import { addFavorite, isFavorite, removeFavorite } from '../services/storage.service.js';

export default class BreedsPage {    constructor() {
        this.breeds = [];
        this.filteredBreeds = [];
        this.loading = false;
        this.error = null;
        this.sortDirection = 'asc';
        this.searchQuery = '';
        this.filterLetter = '';
        this.translations = {
            nl: {
                title: 'Hondenrassen',
                search: 'Zoek rassen...',
                filter: 'Filter op eerste letter',
                all: 'Alle',
                sort: 'Sorteer',
                az: 'A-Z',
                za: 'Z-A',
                noResults: 'Geen hondenrassen gevonden die aan je zoekcriteria voldoen.',
                loading: 'Hondenrassen worden geladen...',
                error: 'Er is een fout opgetreden bij het laden van de hondenrassen. Probeer het later opnieuw.',                subBreeds: 'Subrassen',
                index: 'Nr.',
                name: 'Naam',
                image: 'Foto',
                addToFavorites: 'Toevoegen aan favorieten',
                removeFromFavorites: 'Verwijderen uit favorieten',
                addedToFavorites: 'Toegevoegd aan favorieten!',
                removedFromFavorites: 'Verwijderd uit favorieten!'
            },
            en: {
                title: 'Dog Breeds',
                search: 'Search breeds...',
                filter: 'Filter by first letter',
                all: 'All',
                sort: 'Sort',
                az: 'A-Z',
                za: 'Z-A',
                noResults: 'No dog breeds found matching your search criteria.',
                loading: 'Loading dog breeds...',
                error: 'An error occurred while loading dog breeds. Please try again later.',                subBreeds: 'Sub-breeds',
                index: 'No.',
                name: 'Name',
                image: 'Photo',
                addToFavorites: 'Add to favorites',
                removeFromFavorites: 'Remove from favorites',
                addedToFavorites: 'Added to favorites!',
                removedFromFavorites: 'Removed from favorites!'
            }
        };
        this.language = 'nl'; // Default taal
    }

    /*Initialize de pagina en laad de data*/
    async render() {
        const container = document.createElement('div');
        container.classList.add('page-container', 'breeds-page');
        
        // Pagina titel toevoegen
        const title = document.createElement('h2');
        title.textContent = this.translations[this.language].title;
        container.appendChild(title);

        // Controls maken voor zoeken, filteren en sorteren
        const controls = this.createControls();
        container.appendChild(controls);
        
        // Container voor de kaarten
        const breedsContainer = document.createElement('div');
        breedsContainer.classList.add('breeds-container');
        breedsContainer.id = 'breeds-container';
        
        // Laadstatus tonen
        breedsContainer.innerHTML = `<div class="loading">${this.translations[this.language].loading}</div>`;
        container.appendChild(breedsContainer);
        
        // Data laden
        try {
            this.loading = true;
            await this.loadBreeds();
            this.renderBreeds(breedsContainer);
        } catch (error) {
            console.error('Fout bij laden van hondenrassen:', error);
            breedsContainer.innerHTML = `<div class="error">${this.translations[this.language].error}</div>`;
            this.error = error;
        } finally {
            this.loading = false;
        }
        
        return container;
    }

    /*Maak controls voor zoeken, filteren en sorteren*/
    createControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('controls-container');
        
        // Zoek input
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = this.translations[this.language].search;
        searchInput.classList.add('search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterBreeds();
        });
        
        searchContainer.appendChild(searchInput);
        
        // Filter op eerste letter
        const letterFilterContainer = document.createElement('div');
        letterFilterContainer.classList.add('letter-filter-container');
        
        const letterFilterLabel = document.createElement('label');
        letterFilterLabel.textContent = `${this.translations[this.language].filter}: `;
        letterFilterContainer.appendChild(letterFilterLabel);
        
        const letterSelector = document.createElement('select');
        letterSelector.classList.add('letter-selector');
        
        // Alle optie
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = this.translations[this.language].all;
        letterSelector.appendChild(allOption);
        
        // A-Z opties
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const option = document.createElement('option');
            option.value = letter.toLowerCase();
            option.textContent = letter;
            letterSelector.appendChild(option);
        }
        
        letterSelector.addEventListener('change', (e) => {
            this.filterLetter = e.target.value;
            this.filterBreeds();
        });
        
        letterFilterContainer.appendChild(letterSelector);
        
        // Sorteer opties
        const sortContainer = document.createElement('div');
        sortContainer.classList.add('sort-container');
        
        const sortLabel = document.createElement('label');
        sortLabel.textContent = `${this.translations[this.language].sort}: `;
        sortContainer.appendChild(sortLabel);
        
        const sortSelector = document.createElement('select');
        sortSelector.classList.add('sort-selector');
        
        const sortOptions = [
            { value: 'asc', label: this.translations[this.language].az },
            { value: 'desc', label: this.translations[this.language].za }
        ];
        
        sortOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            sortSelector.appendChild(optionElement);
        });
        
        sortSelector.addEventListener('change', (e) => {
            this.sortDirection = e.target.value;
            this.sortBreeds();
            this.renderBreeds(document.getElementById('breeds-container'));
        });
        
        sortContainer.appendChild(sortSelector);
        
        // Controls toevoegen aan container
        controlsContainer.appendChild(searchContainer);
        controlsContainer.appendChild(letterFilterContainer);
        controlsContainer.appendChild(sortContainer);
        
        return controlsContainer;
    }

    /*Laad alle hondenrassen van de API*/
    async loadBreeds() {
        try {
            const breedsObject = await getAllBreeds();
            
            // Converteer object naar een array met gestructureerde data
            const breedsArray = Object.entries(breedsObject).map(([name, subBreeds], index) => {
                const breedId = name.toLowerCase();
                          return {
                    id: breedId,
                    name: name.charAt(0).toUpperCase() + name.slice(1), // Hoofdletter
                    subBreeds: subBreeds,
                    index: index + 1,
                    imageUrl: null, // Zal later worden ingevuld
                };
            });
            
            this.breeds = breedsArray;
            this.filteredBreeds = [...breedsArray];
            
            // Laad direct een afbeelding voor elk ras
            await this.loadBreedImages();
        } catch (error) {
            console.error('Fout bij het laden van hondenrassen:', error);
            throw error;
        }
    }

    /*Laad afbeeldingen voor alle hondenrassen*/
    async loadBreedImages() {
        // Laad 10 afbeeldingen tegelijk om de API niet te overbelasten
        const batchSize = 10;
        
        for (let i = 0; i < this.breeds.length; i += batchSize) {
            const batch = this.breeds.slice(i, i + batchSize);
            
            // Gebruik Promise.all om alle afbeeldingen parallel te laden
            await Promise.all(batch.map(async (breed) => {
                try {
                    const imageUrl = await getRandomBreedImage(breed.id);
                    
                    // Update de imageUrl voor dit ras in beide arrays
                    const breedIndex = this.breeds.findIndex(b => b.id === breed.id);
                    if (breedIndex !== -1) {
                        this.breeds[breedIndex].imageUrl = imageUrl;
                    }
                    
                    const filteredIndex = this.filteredBreeds.findIndex(b => b.id === breed.id);
                    if (filteredIndex !== -1) {
                        this.filteredBreeds[filteredIndex].imageUrl = imageUrl;
                    }
                } catch (error) {
                    console.error(`Fout bij het laden van afbeelding voor ${breed.name}:`, error);
                    // Gebruik een placeholder als de afbeelding niet kan worden geladen
                    breed.imageUrl = 'https://via.placeholder.com/300x200?text=No+Image';
                }
            }));
        }
    }

    /*Filter hondenrassen op basis van zoekquery en geselecteerde letter*/
    filterBreeds() {
        // Begin met alle rassen
        let filtered = [...this.breeds];
        
        // Filter op zoekquery
        if (this.searchQuery) {
            filtered = filtered.filter(breed => 
                breed.name.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Filter op eerste letter
        if (this.filterLetter) {
            filtered = filtered.filter(breed => 
                breed.name.toLowerCase().startsWith(this.filterLetter)
            );
        }
        
        this.filteredBreeds = filtered;
        this.sortBreeds();
        this.renderBreeds(document.getElementById('breeds-container'));
    }

    /*Sorteer hondenrassen op basis van huidige sorteerrichting*/
    sortBreeds() {
        const direction = this.sortDirection;
        
        this.filteredBreeds.sort((a, b) => {
            if (direction === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }

    /*Toon de gefilterde en gesorteerde hondenrassen*/
    renderBreeds(container) {
        if (this.filteredBreeds.length === 0) {
            container.innerHTML = `<div class="no-results">${this.translations[this.language].noResults}</div>`;
            return;
        }
        
        // Maak een grid voor de rassen
        const breedsGrid = document.createElement('div');
        breedsGrid.classList.add('breeds-grid');
        
        // Maak een kaart voor elk ras
        this.filteredBreeds.forEach(breed => {
            const card = this.createBreedCard(breed);
            breedsGrid.appendChild(card);
        });
        
        container.innerHTML = '';
        container.appendChild(breedsGrid);
    }

    /*Maak een kaart voor een hondenras*/
    createBreedCard(breed) {
        const card = document.createElement('div');
        card.classList.add('breed-card');
        card.dataset.breedId = breed.id;
        
        // Header met naam en volgnummer
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('breed-card-header');
        
        const breedIndex = document.createElement('div');
        breedIndex.classList.add('breed-index');
        breedIndex.textContent = breed.index;
        cardHeader.appendChild(breedIndex);
        
        const breedName = document.createElement('h3');
        breedName.classList.add('breed-name');
        breedName.textContent = breed.name;
        cardHeader.appendChild(breedName);
  
        card.appendChild(cardHeader);
        
        // Afbeelding container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('breed-image-container');
        
        // Loading indicator toevoegen
        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('image-loading-indicator');
        loadingIndicator.textContent = 'Laden...';
        imageContainer.appendChild(loadingIndicator);
        
        const image = document.createElement('img');
        image.classList.add('breed-image');
        
        // Directe laden van afbeeldingen met een event listener voor laden
        if (breed.imageUrl) {
            image.style.display = 'none'; // Verberg tot geladen
            image.src = breed.imageUrl;
            image.alt = breed.name;
            
            // Wanneer de afbeelding geladen is
            image.addEventListener('load', function() {
                // Verwijder loading indicator en toon afbeelding
                loadingIndicator.remove();
                image.style.display = 'block';
            });
            
            // Als er een fout optreedt bij het laden
            image.addEventListener('error', function() {
                loadingIndicator.textContent = 'Kon afbeelding niet laden';
            });
        } else {
            // Fallback als er geen afbeelding URL is
            image.src = 'https://via.placeholder.com/300x200?text=No+Image';
            image.alt = 'Geen afbeelding beschikbaar';
            loadingIndicator.remove();
        }
          // Voeg de afbeelding toe aan de container zonder witruimte ertussen
        imageContainer.appendChild(image);
        card.appendChild(imageContainer);
        
        // Informatie over de hond - direct na de afbeelding zonder tussenruimte
        const infoSection = document.createElement('div');
        infoSection.classList.add('breed-info');
        
        // Direct aansluitend toevoegen
        card.appendChild(infoSection);
        
        // Controleer of het ras al in favorieten staat
        const isFav = isFavorite(breed.id);
          // Acties container met favorietenknop
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('breed-actions');
        
        // Linker deel van de acties container
        const actionsLeft = document.createElement('div');
        actionsLeft.classList.add('breed-actions-left');
        
        // Rechter deel van de acties container
        const actionsRight = document.createElement('div');
        actionsRight.classList.add('breed-actions-right');
        
        // Toon subrassen als die er zijn in het linker deel
        if (breed.subBreeds && breed.subBreeds.length > 0) {
            const subBreedsContainer = document.createElement('div');
            subBreedsContainer.classList.add('sub-breeds');
            
            const subBreedsLabel = document.createElement('strong');
            subBreedsLabel.textContent = `${this.translations[this.language].subBreeds}: `;
            subBreedsContainer.appendChild(subBreedsLabel);
            
            const subBreedsList = document.createElement('span');
            subBreedsList.textContent = breed.subBreeds
                .map(sub => sub.charAt(0).toUpperCase() + sub.slice(1))
                .join(', ');
            subBreedsContainer.appendChild(subBreedsList);
            
            // Plaats de subrassen in het linker deel
            actionsLeft.appendChild(subBreedsContainer);
        }
        
        // Voeg linker deel toe aan acties container
        actionsContainer.appendChild(actionsLeft);
        
        // Favoriet knop toevoegen aan rechter deel
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-button');        if (isFav) {
            favoriteButton.classList.add('is-favorite');
            favoriteButton.innerHTML = '★';
            favoriteButton.title = this.translations[this.language].removeFromFavorites;
        } else {
            favoriteButton.innerHTML = '☆';
            favoriteButton.title = this.translations[this.language].addToFavorites;
        }
          favoriteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Voorkom dat de kaart-klik ook wordt getriggerd
            
            const isCurrentlyFavorite = favoriteButton.classList.contains('is-favorite');
            
            if (isCurrentlyFavorite) {
                // Verwijder uit favorieten
                removeFavorite(breed.id);
                favoriteButton.classList.remove('is-favorite');
                favoriteButton.innerHTML = '☆';
                favoriteButton.title = this.translations[this.language].addToFavorites;
                
                // Toon een notificatie
                this.showNotification(this.translations[this.language].removedFromFavorites);
            } else {
                // Voeg toe aan favorieten
                addFavorite(breed);
                favoriteButton.classList.add('is-favorite');
                favoriteButton.innerHTML = '★';
                favoriteButton.title = this.translations[this.language].removeFromFavorites;
                
                // Toon een notificatie
                this.showNotification(this.translations[this.language].addedToFavorites);
            }
        });
        
        // Voeg de favorietenknop toe aan het rechter deel
        actionsRight.appendChild(favoriteButton);
        
        // Voeg rechter deel toe aan acties container
        actionsContainer.appendChild(actionsRight);
        card.appendChild(actionsContainer);
        
        return card;
    }

    /**
     * Toon een notificatiebericht aan de gebruiker
     * @param {string} message - Het bericht om te tonen
     */
    showNotification(message) {
        // Controleer of er al een notificatie-element bestaat
        let notification = document.getElementById('notification');
        
        if (!notification) {
            // Maak een nieuw notificatie-element
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.classList.add('notification');
            document.body.appendChild(notification);
        }
        
        // Update het bericht en maak het zichtbaar
        notification.textContent = message;
        notification.classList.add('show');
        
        // Verwijder de notificatie na 2 seconden
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}
/*FavoritesPage component - toont een lijst met favoriete hondenrassen*/

import { getFavorites, removeFavorite, getNote } from '../services/storage.service.js';

export default class FavoritesPage {
    constructor() {
        this.favorites = [];
        this.filteredFavorites = [];
        this.sortField = 'name';
        this.sortDirection = 'asc';
        this.searchQuery = '';
        this.translations = {
            nl: {
                title: 'Favoriete Hondenrassen',
                noFavorites: 'Je hebt nog geen favoriete hondenrassen toegevoegd. Bezoek de rassen pagina om favorieten toe te voegen.',
                search: 'Zoek favorieten...',
                sort: 'Sorteer',
                az: 'A-Z',
                za: 'Z-A',
                removeFromFav: 'Verwijderen uit favorieten',
                viewDetails: 'Bekijk details',
                removeAll: 'Verwijder alle favorieten',
                confirmRemoveAll: 'Weet je zeker dat je alle favorieten wilt verwijderen?'
            },
            en: {
                title: 'Favorite Dog Breeds',
                noFavorites: 'You have not added any favorite dog breeds yet. Visit the breeds page to add favorites.',
                search: 'Search favorites...',
                sort: 'Sort',
                az: 'A-Z',
                za: 'Z-A',
                removeFromFav: 'Remove from favorites',
                viewDetails: 'View details',
                removeAll: 'Remove all favorites',
                confirmRemoveAll: 'Are you sure you want to remove all favorites?'
            }
        };
        this.language = 'nl'; // Default taal
    }

    /*Render de pagina en toon de favoriete hondenrassen*/
    render() {
        const container = document.createElement('div');
        container.classList.add('page-container', 'favorites-page');
        
        // Pagina titel
        const title = document.createElement('h2');
        title.textContent = this.translations[this.language].title;
        container.appendChild(title);

        // Haal favorieten op
        this.favorites = getFavorites();
        this.filteredFavorites = [...this.favorites];
        
        // Als er geen favorieten zijn
        if (this.favorites.length === 0) {
            const noFavoritesMessage = document.createElement('div');
            noFavoritesMessage.classList.add('no-favorites-message');
            noFavoritesMessage.textContent = this.translations[this.language].noFavorites;
            
            // Knop om naar de rassen pagina te gaan
            const breedsButton = document.createElement('button');
            breedsButton.classList.add('primary-button');
            breedsButton.textContent = 'Bekijk hondenrassen';
            breedsButton.addEventListener('click', () => {
                window.location.hash = '#/breeds';
            });
            
            container.appendChild(noFavoritesMessage);
            container.appendChild(breedsButton);
            return container;
        }
        
        // Zoek en sorteer controls
        const controlsContainer = this.createControls();
        container.appendChild(controlsContainer);
        
        // Verwijder alle favorieten knop
        const removeAllButton = document.createElement('button');
        removeAllButton.classList.add('remove-all-button');
        removeAllButton.textContent = this.translations[this.language].removeAll;
        removeAllButton.addEventListener('click', () => {
            if (confirm(this.translations[this.language].confirmRemoveAll)) {
                // Verwijder alle favorieten en herlaad de pagina
                this.favorites.forEach(favorite => {
                    removeFavorite(favorite.id);
                });
                
                // Update de pagina (eenvoudige oplossing door opnieuw te renderen)
                container.innerHTML = '';
                container.appendChild(this.render());
            }
        });
        container.appendChild(removeAllButton);
        
        // Container voor favorieten
        const favoritesGrid = document.createElement('div');
        favoritesGrid.classList.add('favorites-grid');
        
        // Sorteer favorieten
        this.sortFavorites();
        
        // Toon elke favoriet
        this.filteredFavorites.forEach(favorite => {
            const favoriteCard = this.createFavoriteCard(favorite);
            favoritesGrid.appendChild(favoriteCard);
        });
        
        container.appendChild(favoritesGrid);
        return container;
    }

    /*Maak de zoek en sorteer controls*/
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
            this.filterFavorites();
        });
        
        searchContainer.appendChild(searchInput);
        
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
            this.sortFavorites();
            
            // Update de DOM
            const grid = document.querySelector('.favorites-grid');
            if (grid) {
                grid.innerHTML = '';
                this.filteredFavorites.forEach(favorite => {
                    const favoriteCard = this.createFavoriteCard(favorite);
                    grid.appendChild(favoriteCard);
                });
            }
        });
        
        sortContainer.appendChild(sortSelector);
        
        // Controls toevoegen
        controlsContainer.appendChild(searchContainer);
        controlsContainer.appendChild(sortContainer);
        
        return controlsContainer;
    }

    /*Filter de favorieten op basis van zoekquery*/
    filterFavorites() {
        if (!this.searchQuery) {
            this.filteredFavorites = [...this.favorites];
        } else {
            this.filteredFavorites = this.favorites.filter(favorite => 
                favorite.name.toLowerCase().includes(this.searchQuery)
            );
        }
        
        this.sortFavorites();
        
        // Update de DOM
        const grid = document.querySelector('.favorites-grid');
        if (grid) {
            grid.innerHTML = '';
            
            if (this.filteredFavorites.length === 0) {
                const noResults = document.createElement('div');
                noResults.classList.add('no-results');
                noResults.textContent = 'Geen resultaten gevonden.';
                grid.appendChild(noResults);
            } else {
                this.filteredFavorites.forEach(favorite => {
                    const favoriteCard = this.createFavoriteCard(favorite);
                    grid.appendChild(favoriteCard);
                });
            }
        }
    }

    /*Sorteer de favorieten op basis van naam*/
    sortFavorites() {
        const direction = this.sortDirection;
        
        this.filteredFavorites.sort((a, b) => {
            if (direction === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }

    /*Maak een kaart voor een favoriet hondenras*/
    createFavoriteCard(favorite) {
        const card = document.createElement('div');
        card.classList.add('favorite-card');
        card.dataset.breedId = favorite.id;
        
        // Afbeelding
        if (favorite.imageUrl) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('favorite-image-container');
            
            // Loading indicator toevoegen
            const loadingIndicator = document.createElement('div');
            loadingIndicator.classList.add('image-loading-indicator');
            loadingIndicator.textContent = 'Laden...';
            imageContainer.appendChild(loadingIndicator);
            
            const image = document.createElement('img');
            image.classList.add('favorite-image');
            image.style.display = 'none'; // Verberg tot geladen
            image.src = favorite.imageUrl;
            image.alt = favorite.name;
            
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
            
            imageContainer.appendChild(image);
            card.appendChild(imageContainer);
        }
        
        // Informatie over het ras
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('favorite-info');
        
        const breedName = document.createElement('h3');
        breedName.textContent = favorite.name;
        infoContainer.appendChild(breedName);
        
        // Populariteit tonen als die beschikbaar is
        if (favorite.popularity) {
            const popularityContainer = document.createElement('div');
            popularityContainer.classList.add('favorite-popularity');
            
            // Sterren voor populariteit
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.classList.add('popularity-star');
                star.innerHTML = i < Math.ceil(favorite.popularity / 2) ? '★' : '☆';
                popularityContainer.appendChild(star);
            }
            
            infoContainer.appendChild(popularityContainer);
        }
        
        // Toon de datum waarop toegevoegd aan favorieten
        if (favorite.dateAdded) {
            const dateAdded = document.createElement('div');
            dateAdded.classList.add('date-added');
            
            const date = new Date(favorite.dateAdded);
            dateAdded.textContent = `Toegevoegd op: ${date.toLocaleDateString()}`;
            infoContainer.appendChild(dateAdded);
        }
        
        // Toon notitie indien aanwezig
        const note = getNote(favorite.id);
        if (note) {
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('favorite-note');
            
            const noteLabel = document.createElement('strong');
            noteLabel.textContent = 'Notitie: ';
            noteContainer.appendChild(noteLabel);
            
            const noteText = document.createElement('span');
            noteText.textContent = note;
            noteContainer.appendChild(noteText);
            
            infoContainer.appendChild(noteContainer);
        }
        
        card.appendChild(infoContainer);
        
        // Acties container
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('favorite-actions');
        
        // Knop om te verwijderen uit favorieten
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-favorite-button');
        removeButton.textContent = '★ ' + this.translations[this.language].removeFromFav;
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFavorite(favorite.id);
            
            // Verwijder uit de lijst
            card.remove();
            
            // Update lokale arrays
            this.favorites = this.favorites.filter(fav => fav.id !== favorite.id);
            this.filteredFavorites = this.filteredFavorites.filter(fav => fav.id !== favorite.id);
            
            // Als er geen favorieten meer zijn, toon bericht
            if (this.favorites.length === 0) {
                const container = document.querySelector('.favorites-page');
                if (container) {
                    container.innerHTML = '';
                    container.appendChild(this.render());
                }
            }
        });
        actionsContainer.appendChild(removeButton);
        
        // Knop om details te bekijken
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('view-details-button');
        detailsButton.textContent = this.translations[this.language].viewDetails;
        detailsButton.addEventListener('click', () => {
            window.location.hash = '#/breeds';
            // Idealiter zouden we direct naar het specifieke ras gaan
        });
        actionsContainer.appendChild(detailsButton);
        
        card.appendChild(actionsContainer);
        
        return card;
    }
}
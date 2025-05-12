import './style.css';
import Layout from './components/Layout.js';
import BreedsPage from './pages/BreedsPage.js';
import { getUserSettings } from './services/storage.service.js';

/*Initialiseer de applicatie wanneer DOM geladen is*/
document.addEventListener('DOMContentLoaded', async () => {
  // Laad gebruikersinstellingen
  const settings = getUserSettings();
  document.body.setAttribute('data-theme', settings.theme || 'light');
  
  const appContainer = document.getElementById('app');
  
  // Maak layout voor de pagina
  const layout = new Layout();
  appContainer.appendChild(layout.render());
  
  // Krijg referentie naar main content gebied
  const mainContent = document.getElementById('main-content');
  
  // Sectie toevoegen voor de BreedsPage
  const breedsSection = document.createElement('section');
  breedsSection.id = 'breeds-section';
  breedsSection.classList.add('app-section');
  
  // Titel voor breeds sectie
  const breedsTitle = document.createElement('h2');
  breedsTitle.textContent = 'Hondenrassen';
  breedsTitle.classList.add('section-title');
  breedsSection.appendChild(breedsTitle);
  
  // Render breed content (async)
  const breedsPage = new BreedsPage();
  const breedsContent = await breedsPage.render();
  breedsSection.appendChild(breedsContent);
  mainContent.appendChild(breedsSection);
  
  // Voeg "terug naar boven" button toe
  addScrollTopButton();
});

/*Maak een scheidingselement tussen secties*/
function createSectionDivider() {
  const divider = document.createElement('div');
  divider.classList.add('section-divider');
  return divider;
}

/*Voeg een "Terug naar boven" knop toe*/
function addScrollTopButton() {
  const scrollTopButton = document.createElement('button');
  scrollTopButton.classList.add('scroll-top-button');
  scrollTopButton.innerHTML = '&uarr;';
  scrollTopButton.title = 'Terug naar boven';
  
  // Toon de knop alleen als gebruiker naar beneden heeft gescrolld
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add('visible');
    } else {
      scrollTopButton.classList.remove('visible');
    }
  });
  
  // Scroll terug naar boven bij klik
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  document.body.appendChild(scrollTopButton);
}
import './style.css';
import './favorites-section.css';
import Layout from './components/Layout.js';
import Router from './router.js';
import BreedsPage from './pages/BreedsPage.js';
import { getUserSettings } from './services/storage.service.js';

/*Initialiseer de applicatie wanneer DOM geladen is*/
document.addEventListener('DOMContentLoaded', async () => {
  // Laad default instellingen
  const settings = getUserSettings();
  document.body.setAttribute('data-theme', 'light');
  
  // We need to set up the app container first
  const appContainer = document.getElementById('app');
  
  // Define routes for the application
  // These will replace the entire app container as per your router.js implementation
  const routes = {
    '/': (container) => {
      // Reset container and add layout first
      container.innerHTML = '';
      const layout = new Layout();
      container.appendChild(layout.render());
      
      // Get the main content area that was just created by the layout
      const mainContent = document.getElementById('main-content');
      
      // Add the breeds page content
      const breedsPage = new BreedsPage();
      breedsPage.render().then(breedsContent => {
        mainContent.appendChild(breedsContent);
        
        // Trigger a custom event to update the active nav link
        window.dispatchEvent(new CustomEvent('routeChanged', { detail: { path: '/' } }));
      });
    },
    '/breeds': (container) => {
      // Reset container and add layout first
      container.innerHTML = '';
      const layout = new Layout();
      container.appendChild(layout.render());
      
      // Get the main content area that was just created by the layout
      const mainContent = document.getElementById('main-content');
      
      // Add the breeds page content
      const breedsPage = new BreedsPage();
      breedsPage.render().then(breedsContent => {
        mainContent.appendChild(breedsContent);
        
        // Trigger a custom event to update the active nav link
        window.dispatchEvent(new CustomEvent('routeChanged', { detail: { path: '/breeds' } }));
      });
    },
    '/404': (container) => {
      // Reset container and add layout first
      container.innerHTML = '';
      const layout = new Layout();
      container.appendChild(layout.render());
      
      // Get the main content area that was just created by the layout
      const mainContent = document.getElementById('main-content');
      
      mainContent.innerHTML = '<div class="error-page"><h2>Pagina niet gevonden</h2><p>De pagina die je zoekt bestaat niet.</p></div>';
    }
  };
  
  // Initialize the router - only passing routes as your router.js expects
  const router = new Router(routes);
  
  // Voeg "terug naar boven" button toe
  addScrollTopButton();
});

/*Voeg een knop toe om terug naar boven te scrollen*/
function addScrollTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.textContent = '↑';
  scrollButton.classList.add('scroll-top-button');
  scrollButton.title = 'Terug naar boven';
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  document.body.appendChild(scrollButton);
  
  // Toon de knop alleen als de gebruiker naar beneden heeft gescrold
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
}
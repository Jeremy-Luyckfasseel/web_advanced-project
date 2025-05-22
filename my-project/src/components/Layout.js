/*Layout component - biedt de basisstructuur voor de single-page applicatie
 *Bevat alleen header en footer zonder navigatie*/

import { getUserSettings } from '../services/storage.service.js';

export default class Layout {    constructor() {
        this.theme = 'light';
        this.language = 'nl';
        this.initTheme();        
        this.translations = {
            nl: {                
                title: 'Dog Explorer',
                footer: 'Dog Explorer © 2025 | Data geleverd door Dog API',
                toggleTheme: 'Wissel tussen licht en donker thema'
            },
            en: {                
                title: 'Dog Explorer',
                footer: 'Dog Explorer © 2025 | Data provided by Dog API',
                toggleTheme: 'Toggle between light and dark theme'
            }
        };
    }    /*Initialiseer thema op basis van gebruikersinstellingen*/
    initTheme() {
        document.body.setAttribute('data-theme', this.theme);
    }    

    /*Wissel tussen licht en donker thema
     *Geschreven aan de hand van AI (GitHub Copilot)*/
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.theme);
        
        // We slaan het thema niet meer op
    }

    /*Maak de layout structuur*/
    render() {
        const container = document.createElement('div');
        container.classList.add('layout-container');

        // Maak header
        const header = this.createHeader();
        container.appendChild(header);

        // Maak main content area
        const main = document.createElement('main');
        main.id = 'main-content';
        main.classList.add('main-content');
        container.appendChild(main);        // Maak footer
        const footer = this.createFooter();
        container.appendChild(footer);
        
        return container;
    }    

    /*Maak de header*/
    createHeader() {
        const header = document.createElement('header');
        header.classList.add('main-header');        // Logo/titel sectie
        const logo = document.createElement('div');
        logo.classList.add('logo');
        
        const logoLink = document.createElement('a');
        logoLink.href = '#/breeds';
        
        const title = document.createElement('h1');
        title.textContent = this.translations[this.language].title;
        logoLink.appendChild(title);
        logo.appendChild(logoLink);
        header.appendChild(logo);

        // Thema toggle knop
        const themeToggle = document.createElement('button');
        themeToggle.classList.add('theme-toggle');
        themeToggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        themeToggle.title = this.translations[this.language].toggleTheme;
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
            themeToggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        });
        header.appendChild(themeToggle);

        return header;
    }

    /*Maak de footer*/
    createFooter() {
        const footer = document.createElement('footer');
        footer.classList.add('main-footer');
        
        const footerText = document.createElement('p');
        footerText.innerHTML = this.translations[this.language].footer;
        footer.appendChild(footerText);
        
        // Link naar Dog API
        const apiLink = document.createElement('a');
        apiLink.href = 'https://dog.ceo/dog-api/';
        apiLink.textContent = 'Dog API';
        apiLink.target = '_blank';
        apiLink.classList.add('api-link');
        footer.appendChild(apiLink);
        
        return footer;
    }
}
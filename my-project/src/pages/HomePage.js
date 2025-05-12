/*HomePage component - Landing page van de Dog Explorer applicatie*/

export default class HomePage {
    constructor() {
        // Initialiseren van de eigenschappen
    }

    /*Homepage weergeven*/
    render() {
        const container = document.createElement('div');
        container.classList.add('page-container', 'home-page');

        // Hero section toevoegen
        const heroSection = this.createHeroSection();
        container.appendChild(heroSection);

        // About section toevoegen
        const aboutSection = this.createAboutSection();
        container.appendChild(aboutSection);

        return container;
    }

    /*Hero section met titel en beschrijving*/
    createHeroSection() {
        const heroSection = document.createElement('section');
        heroSection.classList.add('hero-section');

        const title = document.createElement('h1');
        title.textContent = 'Dog Explorer';
        heroSection.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.textContent = 'Ontdek hondenrassen van over de hele wereld';
        heroSection.appendChild(subtitle);

        const callToAction = document.createElement('button');
        callToAction.textContent = 'Bekijk hondenrassen';
        callToAction.classList.add('cta-button');
        callToAction.addEventListener('click', () => {
            const breedsSection = document.getElementById('breeds-section');
            if (breedsSection) {
                breedsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        heroSection.appendChild(callToAction);

        return heroSection;
    }

    /*About section met informatie over de applicatie*/
    createAboutSection() {
        const aboutSection = document.createElement('section');
        aboutSection.classList.add('about-section');

        const aboutTitle = document.createElement('h2');
        aboutTitle.textContent = 'Over Dog Explorer';
        aboutSection.appendChild(aboutTitle);

        const aboutText = document.createElement('p');
        aboutText.innerHTML = `
            Dog Explorer is een interactieve web applicatie waarmee je hondenrassen kunt verkennen. 
            Deze applicatie maakt gebruik van de <a href="https://dog.ceo/dog-api/" target="_blank">Dog API</a> 
            om afbeeldingen en informatie over hondenrassen te tonen. Je kunt door de rassen bladeren, 
            zoeken op naam, filteren op verschillende eigenschappen en je favoriete rassen opslaan. 
            Ook kun je persoonlijke notities toevoegen aan elk hondenras.
        `;
        aboutSection.appendChild(aboutText);

        const techStack = document.createElement('p');
        techStack.innerHTML = `
            <strong>Technologieën:</strong> JavaScript, CSS, HTML, Dog API, LocalStorage, Vite.
        `;
        aboutSection.appendChild(techStack);

        return aboutSection;
    }
}
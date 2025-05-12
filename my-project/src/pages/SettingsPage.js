/*SettingsPage component - laat gebruikers hun voorkeuren instellen*/

import { getUserSettings, saveUserSettings } from '../services/storage.service.js';

export default class SettingsPage {
    constructor() {
        this.settings = getUserSettings();
        this.translations = {
            nl: {
                title: 'Instellingen',
                appearance: 'Uiterlijk',
                theme: 'Thema',
                light: 'Licht',
                dark: 'Donker',
                language: 'Taal',
                dutch: 'Nederlands',
                english: 'Engels',
                display: 'Weergave',
                itemsPerPage: 'Items per pagina',
                saveSettings: 'Instellingen opslaan',
                settingsSaved: 'Instellingen opgeslagen!',
                resetSettings: 'Reset naar standaardinstellingen',
                confirmReset: 'Weet je zeker dat je alle instellingen wilt resetten?'
            },
            en: {
                title: 'Settings',
                appearance: 'Appearance',
                theme: 'Theme',
                light: 'Light',
                dark: 'Dark',
                language: 'Language',
                dutch: 'Dutch',
                english: 'English',
                display: 'Display',
                itemsPerPage: 'Items per page',
                saveSettings: 'Save Settings',
                settingsSaved: 'Settings saved!',
                resetSettings: 'Reset to default settings',
                confirmReset: 'Are you sure you want to reset all settings?'
            }
        };
        this.language = this.settings.language || 'nl';
    }

    /*Render de instellingen pagina*/
    render() {
        const container = document.createElement('div');
        container.classList.add('page-container', 'settings-page');
        
        // Pagina titel
        const title = document.createElement('h2');
        title.textContent = this.translations[this.language].title;
        container.appendChild(title);

        // Formulier voor instellingen
        const form = document.createElement('form');
        form.classList.add('settings-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings(form);
        });
        
        // Sectie: Uiterlijk
        const appearanceSection = this.createSection(this.translations[this.language].appearance);
        
        // Thema instelling
        const themeGroup = this.createFormGroup(this.translations[this.language].theme);
        
        const themeSelect = document.createElement('select');
        themeSelect.id = 'theme-select';
        themeSelect.name = 'theme';
        
        const lightOption = document.createElement('option');
        lightOption.value = 'light';
        lightOption.textContent = this.translations[this.language].light;
        lightOption.selected = this.settings.theme === 'light';
        themeSelect.appendChild(lightOption);
        
        const darkOption = document.createElement('option');
        darkOption.value = 'dark';
        darkOption.textContent = this.translations[this.language].dark;
        darkOption.selected = this.settings.theme === 'dark';
        themeSelect.appendChild(darkOption);
        
        themeSelect.addEventListener('change', () => {
            // Direct toepassen voor preview
            document.body.setAttribute('data-theme', themeSelect.value);
        });
        
        themeGroup.appendChild(themeSelect);
        appearanceSection.appendChild(themeGroup);
        
        // Taal instelling
        const languageGroup = this.createFormGroup(this.translations[this.language].language);
        
        const languageSelect = document.createElement('select');
        languageSelect.id = 'language-select';
        languageSelect.name = 'language';
        
        const dutchOption = document.createElement('option');
        dutchOption.value = 'nl';
        dutchOption.textContent = this.translations[this.language].dutch;
        dutchOption.selected = this.settings.language === 'nl';
        languageSelect.appendChild(dutchOption);
        
        const englishOption = document.createElement('option');
        englishOption.value = 'en';
        englishOption.textContent = this.translations[this.language].english;
        englishOption.selected = this.settings.language === 'en';
        languageSelect.appendChild(englishOption);
        
        languageGroup.appendChild(languageSelect);
        appearanceSection.appendChild(languageGroup);
        
        form.appendChild(appearanceSection);
        
        // Sectie: Weergave
        const displaySection = this.createSection(this.translations[this.language].display);
        
        // Items per pagina instelling
        const itemsPerPageGroup = this.createFormGroup(this.translations[this.language].itemsPerPage);
        
        const itemsPerPageSelect = document.createElement('select');
        itemsPerPageSelect.id = 'items-per-page-select';
        itemsPerPageSelect.name = 'itemsPerPage';
        
        [12, 24, 36, 48].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            option.selected = parseInt(this.settings.itemsPerPage) === value;
            itemsPerPageSelect.appendChild(option);
        });
        
        itemsPerPageGroup.appendChild(itemsPerPageSelect);
        displaySection.appendChild(itemsPerPageGroup);
        
        form.appendChild(displaySection);
        
        // Knoppen
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('settings-buttons');
        
        // Opslaan knop
        const saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.classList.add('primary-button');
        saveButton.textContent = this.translations[this.language].saveSettings;
        buttonsContainer.appendChild(saveButton);
        
        // Reset knop
        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.classList.add('secondary-button');
        resetButton.textContent = this.translations[this.language].resetSettings;
        resetButton.addEventListener('click', () => {
            if (confirm(this.translations[this.language].confirmReset)) {
                // Reset naar standaardwaarden
                saveUserSettings({
                    theme: 'light',
                    language: 'nl',
                    itemsPerPage: 12
                });
                
                // Pagina herladen om wijzigingen toe te passen
                window.location.reload();
            }
        });
        buttonsContainer.appendChild(resetButton);
        
        form.appendChild(buttonsContainer);
        
        // Status bericht container (voor feedback na opslaan)
        const statusMessage = document.createElement('div');
        statusMessage.id = 'settings-status';
        statusMessage.classList.add('settings-status');
        form.appendChild(statusMessage);
        
        container.appendChild(form);
        return container;
    }

    /*Maak een sectie voor het formulier*/
    createSection(title) {
        const section = document.createElement('div');
        section.classList.add('settings-section');
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);
        
        return section;
    }

    /*Maak een formulier groep met label*/
    createFormGroup(label) {
        const group = document.createElement('div');
        group.classList.add('form-group');
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        group.appendChild(labelElement);
        
        return group;
    }

    /*Sla de instellingen op*/
    saveSettings(form) {
        // Verzamel waarden uit het formulier
        const formData = new FormData(form);
        const settings = {
            theme: formData.get('theme'),
            language: formData.get('language'),
            itemsPerPage: formData.get('itemsPerPage')
        };
        
        // Sla de instellingen op
        saveUserSettings(settings);
        
        // Toon bevestigingsbericht
        const statusElement = document.getElementById('settings-status');
        const lang = settings.language;
        statusElement.textContent = this.translations[lang].settingsSaved;
        statusElement.classList.add('success');
        
        // Verwijder het bericht na 2 seconden
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.classList.remove('success');
            
            // Als de taal veranderd is, herlaad de pagina om de wijzigingen toe te passen
            if (this.language !== lang) {
                window.location.reload();
            }
        }, 2000);
        
        // Pas thema direct toe
        document.body.setAttribute('data-theme', settings.theme);
        
        // Update lokale instellingen
        this.settings = settings;
        this.language = settings.language;
    }
}
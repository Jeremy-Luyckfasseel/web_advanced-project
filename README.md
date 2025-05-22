# Dog Explorer 🐕

Een interactieve single-page webapplicatie voor het verkennen van hondenrassen, gebouwd met vanilla JavaScript en de Dog API.

## Projectbeschrijving

Dog Explorer stelt gebruikers in staat om:
- Hondenrassen te bekijken en doorzoeken
- Rassen te filteren op eerste letter en subrassen
- Rassen te sorteren (A-Z of Z-A)
- Favoriete rassen op te slaan
- Te wisselen tussen licht en donker thema
- Taalvoorkeur in te stellen (Nederlands/Engels)

## Screenshots

![Screenshot](/my-project/screenshots/lightmode.png)
![Screenshot](/my-project/screenshots/darkmode.png)

## Functionele Vereisten

### 1. Dataverzameling & -weergave ✅
- Data ophalen van Dog API (meer dan 20 hondenrassen)
- Visueel aantrekkelijke weergave met foto's
- Details per ras:
  - Naam
  - Afbeelding
  - Subrassen (indien aanwezig)
  - Index nummer
  - Favoriet status
  - Datum toegevoegd aan favorieten

### 2. Interactiviteit ✅
- Filter op eerste letter
- Filter op subrassen
- Zoekfunctie
- Sorteren (A-Z, Z-A)

### 3. Personalisatie ✅
- Favoriete rassen opslaan
- Data blijft bewaard (LocalStorage)
- Gebruikersvoorkeuren:
  - Thema (licht/donker)
  - Taal (NL/EN)

### 4. Gebruikerservaring ✅
- Volledig responsive design
- Moderne, aantrekkelijke interface
- Intuïtieve navigatie
- Laadstatus indicators
- Notificaties bij acties

## Technische Vereisten

### DOM Manipulatie
- **Element selectie**: `main.js` regels 15, 92-95
- **Element manipulatie**: `BreedsPage.js` regels 127-186
- **Event handling**: `Layout.js` regels 71-76

### Modern JavaScript
- **Constanten**: `storage.service.js` regel 4
- **Template literals**: `api.service.js` regel 12
- **Array iteratie**: `BreedsPage.js` regels 162-172
- **Array methodes**: `storage.service.js` regels 18-20
- **Arrow functions**: Door hele project heen
- **Ternary operator**: `Layout.js` regel 33
- **Callback functions**: `main.js` regels 90-96
- **Promises**: `api.service.js` volledig bestand
- **Async/Await**: `BreedsPage.js` regels 77-106
- **Observer API**: Intersection Observer voor lazy loading in `BreedsPage.js`

### Data & API
- **Fetch**: `api.service.js` regels 8-25
- **JSON**: `storage.service.js` regels 9-10

### Opslag & Validatie
- **LocalStorage**: `storage.service.js` volledig bestand
- **Form validation**: `BreedsPage.js` regels 134-140

### Styling & Layout
- **Flexbox/Grid**: `style.css` regels 400-420
- **Responsive Design**: `style.css` regels 600-650
- **UI Elements**: `style.css` regels 450-500

## Gebruikte API

[Dog API](https://dog.ceo/dog-api/) - Een uitgebreide API met hondenras informatie en afbeeldingen.

## Installatie

1. Clone de repository:
```pwsh
git clone [https://github.com/Jeremy-Luyckfasseel/web_advanced-project.git]
cd my-project
```

2. Installeer dependencies:
```pwsh
npm install
```

3. Start development server:
```pwsh
npm run dev
```

4. Open http://localhost:5173 in je browser

## Gebruikte Bronnen

- [Dog API Documentatie](https://dog.ceo/dog-api/documentation/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Copilot Chat Logs](chatlog.md) - AI assistentie voor:
  - Scroll-to-top functionaliteit
  - Theme toggle implementatie
  - Debug utilities
  - API service optimalisatie
  - Complexe filtering/sorting logica
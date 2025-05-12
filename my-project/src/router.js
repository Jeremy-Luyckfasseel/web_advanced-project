class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElement = document.getElementById('app');

        // Luister naar hash veranderingen
        window.addEventListener('hashchange', () => this.handleRouteChange());

        // Luister naar de initial load
        this.handleRouteChange(); // Initial route check

    }

    handleRouteChange() {
        // Verwijder de hash van de URL
        const path = window.location.hash.slice(1) || '/';

        // vind de juiste router handler
        const route = this.routes[path] || this.routes['/404'];

        // verwijderd bestaande inhoud
        this.rootElement.innerHTML = '';

        // voeg nieuwe inhoud toe
        route(this.rootElement);
    }
}

export default Router;
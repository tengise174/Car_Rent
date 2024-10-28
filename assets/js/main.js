import { fetchCarsData, filterCars, renderCars } from './carModule.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cars = await fetchCarsData();

    const filters = getQueryParams();
    const filteredCars = filterCars(cars, filters);
    renderCars(filteredCars);

    const filterButton = document.querySelector(".search-button");
    filterButton.addEventListener('click', (event) => {
        event.preventDefault();
        handleSearch(cars);
    });
});

function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return {
        make: queryParams.get('make') || '',
        type: queryParams.get('type') || '',
        transmission: queryParams.get('transmission') || '',
        seats: queryParams.get('seats') || '',
        price: queryParams.get('price') || '',
    };
}

function handleSearch(cars) {
    const filters = {
        make: document.getElementById('make').value,
        type: document.getElementById('type').value,
        transmission: document.getElementById('transmission').value,
        seats: document.getElementById('seats').value,
        price: document.getElementById('price').value,
    };

    const queryParams = new URLSearchParams();

    for (const key in filters) {
        if (filters[key]) { 
            queryParams.append(key, filters[key]);
        }
    }
    window.history.pushState({}, '', `?${queryParams.toString()}`);

    const filteredCars = filterCars(cars, filters);
    renderCars(filteredCars);
}

document.cookie = "__Host-name=value; Secure; Path=/; SameSite=None; Partitioned";
import { fetchCarsData, renderCars } from './carModule.js';

document.addEventListener('DOMContentLoaded', async () => {
    const filters =getQueryParams();

    const filteredCars = await fetchCarsData(filters);

    setDropdownValues(filters);
    renderCars(filteredCars);
    setListenerCar();

    const filterButton = document.querySelector(".search-button");
    filterButton.addEventListener('click', (event) => {
        event.preventDefault();
        handleSearch();
    });    
});

function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return {
        location: queryParams.get('location') || '',
        make: queryParams.get('make') || '',
        type: queryParams.get('type') || '',
        transmission: queryParams.get('transmission') || '',
        seats: queryParams.get('seats') || '',
        price: queryParams.get('price') || '',
        startDate: queryParams.get('startDate') || '',
        endDate: queryParams.get('endDate') || ''
    };
}

function setDropdownValues(filters) {
    for (const key in filters) {
        const selectElement = document.getElementById(key);
        if (selectElement) {
            selectElement.value = filters[key]; 
        }
    }
}

function handleSearch() {
    const filters = {
        location: document.getElementById('location').value,
        make: document.getElementById('make').value,
        type: document.getElementById('type').value,
        transmission: document.getElementById('transmission').value,
        seats: document.getElementById('seats').value,
        price: document.getElementById('price').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
    };

    const queryParams = new URLSearchParams();

    for (const key in filters) {
        if (filters[key]) {
            queryParams.append(key, filters[key]);
        }
    }
    window.history.pushState({}, '', `?${queryParams.toString()}`);

    fetchCarsData(filters)
        .then(filteredCars => {
            renderCars(filteredCars);
            setListenerCar();
        })
        .catch(error => {
            console.error("Error fetching filtered cars:", error);
        });
}

function setListenerCar() {
    const carItems = document.querySelectorAll(".car-item");
    carItems.forEach(item => {
        item.addEventListener('click', () => {
            const carId = item.getAttribute('data-id');
            let url = `car.html?id=${carId}`;

            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;

            if (startDate) {
                url += `&startDate=${encodeURIComponent(startDate)}`;
            }
            if (endDate) {
                url += `&endDate=${encodeURIComponent(endDate)}`;
            }

            window.location.href = url;
        })
    })
}



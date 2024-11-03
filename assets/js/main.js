document.addEventListener('DOMContentLoaded', async () => {
    const cars = await fetchCarsData();

    const filters = getQueryParams();
    const filteredCars = filterCars(cars, filters);
    setDropdownValues(filters);
    renderCars(filteredCars);

    const filterButton = document.querySelector(".search-button");
    filterButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        handleSearch(cars); 
    });
});

function handleSearch(cars) {
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

    const filteredCars = filterCars(cars, filters);
    renderCars(filteredCars);
}
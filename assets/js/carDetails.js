document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');  
    if (!carId) {
        document.getElementById('car-detail').innerHTML = '<p>Машин олдсонгүй.</p>';
        return;
    }
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');
    if (startDate) {
        document.getElementById('start-date').value = startDate;
    }
    if (endDate) {
        document.getElementById('end-date').value = endDate;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/car?id=${carId}`);
        if (!response.ok) throw new Error('Car not found');

        const cars = await response.json();
        const car = cars[0];
        console.log('API Response:', cars);
        updateCarDetails(car);
    } catch (error) {
        document.getElementById('car-detail').innerHTML = '<p>Машин олдсонгүй.</p>';
        console.log(error);
    }
});

function updateCarDetails(car) {
    console.log(car);
    document.getElementById('car-title').textContent = `${car.make} ${car.model} ${car.year}`;
    document.getElementById('car-price').textContent = `${car.daily_rate}`;
    document.getElementById('large-image').src = car.image[0];
    document.getElementById('small-image-1').src = car.image[1];
    document.getElementById('small-image-2').src = car.image[2];

    document.getElementById('car-description').textContent = car.desc;
    document.getElementById('extra-text').textContent = car.more_desc;
    document.getElementById('fuel-consumption').textContent = `${car.fuelConsumption}`;
    document.getElementById('doors').textContent = `${car.doors}`;
    document.getElementById('seats').textContent = `${car.seats}`;
    document.getElementById('tires').textContent = car.tires;
    document.getElementById('engine-volume').textContent = `${car.motor}`;
    document.getElementById('odometer').textContent = `${car.odometer}`;
    document.getElementById('comfort').textContent = `${car.ratings[0]}`
    document.getElementById('maintenance').textContent = `${car.ratings[1]}`
    document.getElementById('cleanliness').textContent = `${car.ratings[2]}`
    document.getElementById('communication').textContent = `${car.ratings[3]}`
    document.getElementById('location').value = car.location;
}

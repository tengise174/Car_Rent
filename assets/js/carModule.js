export class Car {
    constructor({id, location ,make, model, year, price_category, type, transmission, seats, rating, trips, daily_rate, image, start_date, end_date, fuel_consumption, doors, odometer, tires, motor, ratings, desc, more_desc}) {
        this.id = id;
        this.location = location;
        this.make = make;
        this.model = model;
        this.year = year;
        this.priceCategory = price_category;
        this.type = type;
        this.transmission = transmission;
        this.seats = seats;
        this.rating = rating;
        this.trips = trips;
        this.dailyRate = daily_rate;
        this.image = image;
        this.startDate = start_date;
        this.endDate = end_date;
        this.fuelConsumption = fuel_consumption;
        this.doors = doors;
        this.odometer = odometer;
        this.tires = tires;
        this.motor = motor;
        this.ratings = ratings;
        this.desc = desc;
        this.moreDesc = more_desc;
    }

    createCarItem() {
        return `
            <article class="car-item" data-id=${this.id}>
                <img src="${this.image[0]}" alt="${this.make} ${this.model} ${this.year}">
                <div>
                    <h3>${this.make} ${this.model} ${this.year}</h3>
                    <p>(${this.trips} аялал)</p>
                    <p>Үнэлгээ: ${this.rating} ☆</p>
                    <p>₮${this.dailyRate}/day</p>
                    <button aria-label="Heart"><i class="fa-regular fa-heart"></i></button>
                </div>
            </article>
        `;
    }
}

export async function fetchCarsData(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `http://localhost:3000/api/car?${queryParams}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error!`);
    }

    const data = await response.json();
    console.log(data);
    return data; 
}

export function renderCars(cars) {
    const carListContainer = document.querySelector('.car-list');
    carListContainer.innerHTML = `<h2>Нийт ${cars.length} машин</h2>` + 
        cars
            .map(carData => new Car(carData)) 
            .map(car => car.createCarItem()) 
            .join('');
}
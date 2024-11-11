export class Car {
    constructor({id, location ,make, model, year, priceCategory, type, transmission, seats, rating, trips, dailyRate, image, startDate, endDate, fuelConsumption, doors, odometer, tires, motor, ratings, desc, moreDesc}) {
        this.id = id;
        this.location = location;
        this.make = make;
        this.model = model;
        this.year = year;
        this.priceCategory = priceCategory;
        this.type = type;
        this.transmission = transmission;
        this.seats = seats;
        this.rating = rating;
        this.trips = trips;
        this.dailyRate = dailyRate;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fuelConsumption = fuelConsumption;
        this.doors = doors;
        this.odometer = odometer;
        this.tires = tires;
        this.motor = motor;
        this.ratings = ratings;
        this.desc = desc;
        this.moreDesc = moreDesc;
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

export async function fetchCarsData() {
    const url = 'https://api.jsonbin.io/v3/b/671fa22ce41b4d34e44a38de';

    const apiKey = "$2a$10$fRL5.SIcepg5Dq1D5lWfzurg9Niu.tXWvdswZgPsrXzY2DV6MPz6y";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        }
    });

    if(!response.ok){
        throw new Error(`HTTP error!`);
    } 
    const data = await response.json();
    return data.record.cars.map(car => new Car(car));
}

export function filterCars(cars, filters) {
    return cars.filter(car => {
        return (
            (!filters.price || car.priceCategory === filters.price)
            && (!filters.location || car.location === filters.location)
            && (!filters.type || car.type === filters.type)
            && (!filters.transmission || car.transmission === filters.transmission)
            && (!filters.seats || car.seats === parseInt(filters.seats))
            && (!filters.make || car.make === filters.make)
            && (!filters.startDate || car.startDate <= filters.startDate)
            && (!filters.endDate || car.endDate >= filters.endDate)
        );
    });
}

export function renderCars(cars) {
    const carListContainer = document.querySelector('.car-list');
    carListContainer.innerHTML = `<h2>Нийт ${cars.length} машин</h2>` + cars.map(car => car.createCarItem()).join();
}
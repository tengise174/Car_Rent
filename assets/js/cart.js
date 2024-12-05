// app.js
import { addToWishlist } from './car.js';

function setupAddToWishlistButton() {
    const btn = document.getElementById('btnAddToCart');
    if (btn) {
        btn.addEventListener('click', (event) => {

            event.preventDefault();
            
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (!startDate || !endDate) {
                alert("Please select both start and end dates.");
                return;
            }

            const car = {
                name: document.getElementById('car-title').innerText,
                price: document.getElementById('car-price').innerText,
                image: document.getElementById('large-image').src,
                startDate: startDate,
                endDate: endDate,
                isChecked: false,
            };

            addToWishlist(car);
            window.location.href = 'wishlist.html';
        });
    }
}

function init() {
    setupAddToWishlistButton();
}

init();

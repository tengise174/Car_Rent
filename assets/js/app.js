// app.js
import { addToWishlist , removeFromWishlist} from './car.js';
import { displayWishlist } from './wishlist.js';

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
                endDate: endDate
            };

            addToWishlist(car);
            window.location.href = 'wishlist.html';
        });
    }
}

function setupRemoveButtons() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeFromWishlist(index);
            displayWishlist();
            setupRemoveButtons(); 
        });
    });
}

function init() {
    setupAddToWishlistButton();

    if (document.getElementById('wishlist-container')) {
        displayWishlist();
        setupRemoveButtons();  
    }
}

init();

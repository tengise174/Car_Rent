// wishlist.js
export function displayWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-container');

    wishlistContainer.innerHTML = "";

    if (wishlist.length > 0) {
        wishlist.forEach((car, index) => {
            const carItem = document.createElement('article');
            carItem.classList.add('car-item');

            carItem.innerHTML = `
                <input type="checkbox">
                <div class="content">   
                    <img src="${car.image}" alt="Car image">
                    <figure>
                        <h2>${car.name}</h2>
                        <figcaption>${car.price} /өдөр</figcaption>
                    </figure>
                    <form class="date-form">
                        <div class="form-group">
                            <label for="from">From:</label>
                            <input type="datetime-local" value="${car.startDate}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="until">Until:</label>
                            <input type="datetime-local" value="${car.endDate}" disabled>
                        </div>
                    </form>
                    <button type="button" class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            wishlistContainer.appendChild(carItem);
        });
    } else {
        wishlistContainer.innerHTML = '<p>No cars in your Cart.</p>';
    }
}

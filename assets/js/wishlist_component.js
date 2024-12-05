import globalState from './GlobalState.js';

class WishlistContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.renderWishlist();
        globalState.addListener(this.update.bind(this)); 
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .car-item { margin-bottom: 20px; display: flex; align-items: center; }
                .car-item img { width: 100px; margin-right: 20px; }
            </style>
            <h1><slot name="wishlist-title">Car Wishlist</slot></h1>
            <div id="wishlist-container">
                <slot name="no-items-message">No cars in your Wishlist.</slot>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    renderWishlist() {
        const container = this.shadowRoot.querySelector('#wishlist-container');
        container.innerHTML = '';

        if (globalState.wishlist.length === 0) {
            container.innerHTML = '<p><slot name="no-items-message">No cars in your Wishlist.</slot></p>';
            return;
        }

        globalState.wishlist.forEach((car, index) => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');

            const startDate = new Date(car.startDate).toLocaleDateString();
            const endDate = new Date(car.endDate).toLocaleDateString();

            carItem.innerHTML = `
                <input type="checkbox" data-index="${index}" ${car.isChecked ? 'checked' : ''}>
                <img src="${car.image}" alt="${car.name}">
                <div>
                    <h2>${car.name}</h2>
                    <p>${car.price} /day</p>
                    <div>
                        <p>Start date: ${startDate}</p>
                        <p>End date: ${endDate}</p>
                    </div>
                    <button data-index="${index}" class="remove-btn">Remove</button>
                </div>
            `;

            carItem.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                globalState.updateCarSelection(index, isChecked);
            });

            carItem.querySelector('.remove-btn').addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                globalState.removeCar(index);
            });

            container.appendChild(carItem);
        });
    }

    update(wishlist) {
        this.renderWishlist();
    }
}

customElements.define('wishlist-container', WishlistContainer);

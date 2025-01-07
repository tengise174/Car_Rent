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
                :host {
                    width: 50%;
                    display: block;
                    margin: 0 auto; 
                    padding: 3rem;
                }
                .car-item { 
                    width: 100%;
                    margin-bottom: 20px; 
                    display: flex; 
                    align-items: center; 
                    padding: 0 1rem 1rem 1rem;
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                .car-item img { 
                    width: 200px; 
                    height: 150px;
                    margin-right: 20px; 
                    border-radius: 16px;
                    }
                .remove-btn {
                    width: 100%;
                    background-color: blue;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .remove-btn:hover, .toggle-days-btn:hover {
                    background-color: #666;
                }

                .toggle-days-btn {
                    width: 40%;
                    background-color: blue;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin-bottom: 2rem;
                }

                @media (max-width: 932px) {
                        :host {
                            width: 80%;
                        }
                    }

            </style>
            <h1><slot name="wishlist-title">Car Wishlist</slot></h1>
            <button class="toggle-days-btn">Түрээслэсэн өдөр харуулах</button>
            <div id="wishlist-container">
                <slot name="no-items-message">No cars in your Wishlist.</slot>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.toggle-days-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('toggle-days', { 
                bubbles: true, 
                composed: true 
            }));
        });
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
                    <h3>${car.name}</h3>
                    <p>${car.price}₮ /өдөр</p>
                    <div>
                        <p>Эхлэх: ${startDate}</p>
                        <p>Дуусах: ${endDate}</p>
                    </div>
                    <button data-index="${index}" class="remove-btn">хасах</button>
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

import globalState from './GlobalState.js';

class OrderSummary extends HTMLElement {
    constructor() {
        super();
        this.netTotal = 0;
        this._showCarTotal = true;
        this._carSelected = false;
    }

    static get observedAttributes() {
        return ['show-car-total'];
    }

    get showCarTotal() {
        return this._showCarTotal;
    }

    set showCarTotal(value) {
        const parsedValue = value === 'true';
        if (this._showCarTotal !== parsedValue) {
            this._showCarTotal = parsedValue;
            this.renderCarSummary(globalState.wishlist); 
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'show-car-total') {
            this.showCarTotal = newValue; 
        }
    }

    connectedCallback() {
        this.render();
        globalState.addListener(this.update.bind(this)); 
        this.renderCarSummary(globalState.wishlist);
    }

    render() {
        this.innerHTML = `
            <style>
                .order-summary { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    background-color: var(--background-color); /* Default light mode */
                    color: var(--main-color); /* Default light mode text color */
                    transition: background-color 0.3s, color 0.3s;
                    border: ${this._carSelected ? '2px solid blue' : 'none'};
                }
                .car-item {
                    background-color: var(--background-color); /* Default light mode */
                    color: var(--main-color);
                }
                .order-summary h2 { margin-bottom: 10px; }
                .order-summary p { font-size: 1.2em; }
                
                /* Dark mode styles */
                @media (prefers-color-scheme: dark) {
                    .order-summary {
                        background-color: var(--dark-promo-background);
                        color: var(--dark-text-color);
                    }
                    .car-item {
                        background-color: var(--dark-promo-background);
                        color: var(--dark-text-color);
                    }
                }
            </style>
            <div class="order-summary">
                <h2>Order Summary</h2>
                <div id="car-summary"></div>
                <p><strong>Total: $<span id="total">0.00</span></strong></p>
            </div>
        `;
    }

    update(wishlist) {
        this.renderCarSummary(wishlist);
    }

    renderCarSummary(wishlist) {
        const carSummaryContainer = this.querySelector('#car-summary');
        carSummaryContainer.innerHTML = '';  

        let netTotal = 0;  
        let carSelected = false; 

        wishlist.forEach(car => {
            if (car.isChecked) {
                const startDate = new Date(car.startDate);
                const endDate = new Date(car.endDate);
                const dayDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
                const carTotalPrice = car.price * dayDifference; 

                netTotal += carTotalPrice;  

                const carItem = document.createElement('div');
                carItem.classList.add('car-item');

                if (this.showCarTotal) {
                    carItem.innerHTML = `
                        <p><strong>${car.name}</strong></p>
                        <p><strong>Total: $${carTotalPrice.toFixed(2)}</strong></p>
                    `;
                } 

                carSummaryContainer.appendChild(carItem);
                carSelected = true;
            }
        });

        this._carSelected = carSelected;

        this.querySelector('.order-summary').style.border = carSelected ? '2px solid blue' : 'none';

        this.querySelector('#total').textContent = netTotal.toFixed(2);
    }
}

customElements.define('order-summary', OrderSummary);

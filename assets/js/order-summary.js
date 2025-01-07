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

        document.addEventListener('toggle-days', this.toggleDayDifference.bind(this));
        this.showDayDifference = false;

        this.querySelector('.check-btn').addEventListener('click', this.handlePayment.bind(this));
    }

    toggleDayDifference() {
        this.showDayDifference = !this.showDayDifference;
        this.renderCarSummary(globalState.wishlist);
    }

    render() {
        this.innerHTML = `
            <style>
                .order-summary {
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    background-color: var(--background-color); 
                    color: var(--main-color); 
                    transition: background-color 0.3s, color 0.3s;
                }
                .car-item {
                    background-color: var(--background-color); 
                    color: var(--main-color);
                    border-radius: 0;
                }
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
                <h2>Захиалга</h2>
                <div id="car-summary"></div>
                <p style="margin-top: 2rem;"><strong>Нийт төлөх дүн: <span id="total">0.00</span>₮</strong></p>
                <button class="check-btn">Баталгаажуулах</button>
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
    
                // Deformat the formatted price (remove currency symbols and commas)
                const carDailyRate = parseFloat(car.price.replace(/[^\d.-]/g, ''));
                const carTotalPrice = carDailyRate * dayDifference;
    
                netTotal += carTotalPrice;
    
                const carItem = document.createElement('div');
                carItem.classList.add('car-item');
    
                if (this.showCarTotal) {
                    carItem.innerHTML = `
                        <p><strong>Нэр: ${car.name}</strong></p>
                        <p><strong>Үнэ: ${carTotalPrice.toFixed(2)}₮</strong></p>
                        ${this.showDayDifference ? `<p><strong>Түрээслэх өдөр: ${dayDifference}</strong></p>` : ''}
                    `;
                }
    
                carSummaryContainer.appendChild(carItem);
                carSelected = true;
            }
        });
    
        this._carSelected = carSelected;
    
        // Change border style based on car selection
        this.style.border = carSelected ? '2px solid #98c9ef' : '1px solid #ccc';
    
        // Update the total amount
        this.querySelector('#total').textContent = netTotal.toFixed(2);
    }
    

        async handlePayment() {
            const totalAmount = this.querySelector('#total').textContent;
            const response = await fetch('http://localhost:3000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalAmount }),
            });
    
            if (response.status === 201) {
                alert('Төлбөр амжилттай хийгдлээ!');
            } else {
                alert('Төлбөр хийх үед алдаа гарлаа.');
            }
        }
}

customElements.define('order-summary', OrderSummary);

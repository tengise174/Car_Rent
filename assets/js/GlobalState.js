class GlobalState {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.listeners = [];
        this.notify();
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.wishlist));
    }

    addCar(car) {
        this.wishlist.push(car);
        this.updateLocalStorage();
        this.notify();
    }

    updateCarSelection(index, isChecked) {
        this.wishlist[index].isChecked = isChecked;
        this.updateLocalStorage();
        this.notify();
    }

    removeCar(index) {
        this.wishlist.splice(index, 1);
        this.updateLocalStorage();
        this.notify();
    }
    
    updateLocalStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
}

const globalState = new GlobalState();
export default globalState;


/// 3. Component attribute soligdohod?   -- order_summary-n netTotal
/// 4. Component property                -- order summary showCarTotal propert
/// 5. CustomEvent()                     -- Odor haruulah toggle buttond avsan
/// 6. Undsen web iin css avah           -- Order Summary avc baigaa
/// 7. Shadow Dom                        -- wishlist container
/// 8. template and slot                 -- wishlist container-iin render dotor template bolon slot ashiglasan.
/// 9. state ashiglan style zaaj ogoh    -- ordersummary isSelected state ashiglana border zaaj ogc bgaa
/// 10. Browser haagaad neehed sagsan dah baraa baih     -- Order summary ni isChecked-g shalgaj, true baival oortoo avc baigaa

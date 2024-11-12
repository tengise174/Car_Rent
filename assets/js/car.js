export function addToWishlist(carDetails) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist.push(carDetails);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    return true;
}

export function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (index >= 0 && index < wishlist.length) {
        wishlist.splice(index, 1);
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

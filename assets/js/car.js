export function addToWishlist(carDetails) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist.push(carDetails);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    return true;
}

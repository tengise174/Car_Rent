function openReviewPopup() {
    document.getElementById("reviewPopup").style.display = "flex";
}

function closeReviewPopup() {
    document.getElementById("reviewPopup").style.display = "none";
}

let ratings = {
    comfort: 0,
    service: 0,
    cleanliness: 0,
    communication: 0
};

// Одыг сонгох функц
document.querySelectorAll(".stars .star").forEach(star => {
    star.addEventListener("click", function() {
        let ratingValue = this.getAttribute("data-value");
        let category = this.parentElement.getAttribute("data-category");
        
        ratings[category] = ratingValue;

        // Сонгосон оддыг тодруулах
        highlightStars(this.parentElement, ratingValue);
    });
});

// Сонгосон одыг тодруулах
function highlightStars(starContainer, ratingValue) {
    starContainer.querySelectorAll(".star").forEach(star => {
        star.classList.remove("selected");
        if (star.getAttribute("data-value") <= ratingValue) {
            star.classList.add("selected");
        }
    });
}

function submitReview() {
    console.log("Үнэлгээ:", ratings);
    alert("Таны сэтгэгдэл амжилттай илгээгдлээ!");
    closeReviewPopup();
}
document.getElementById('user-dropdown-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('active');
});

window.addEventListener('click', function (e) {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown.contains(e.target) && !document.getElementById('user-dropdown-toggle').contains(e.target)) {
        dropdown.classList.remove('active');
    }
});



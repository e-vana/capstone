//mobile menu
const toggleButton = document.getElementsByClassName('mobile-menu')[0];
const navbarLinks = document.getElementsByClassName('navigation')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});






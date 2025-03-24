// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.querySelector('.header_text');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
        });
    }
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(event) {
        if (headerNav && headerNav.classList.contains('active') && !headerNav.contains(event.target) && event.target !== menuToggle) {
            headerNav.classList.remove('active');
        }
    });
    
    // Ajout d'une classe active au lien de navigation courant
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.header_text a:not(#logo)');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
});
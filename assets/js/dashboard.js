document.addEventListener('DOMContentLoaded', function() {
    // Gestion des notifications
    const notificationsToggle = document.querySelector('.notifications-toggle');
    const notificationsMenu = document.querySelector('.notifications-menu');
    const markAllRead = document.querySelector('.mark-all-read');
    
    if (notificationsToggle && notificationsMenu) {
        // Afficher/masquer le menu des notifications
        notificationsToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            notificationsMenu.classList.toggle('show');
        });
        
        // Fermer le menu des notifications en cliquant en dehors
        document.addEventListener('click', function(event) {
            if (notificationsMenu.classList.contains('show') && !notificationsMenu.contains(event.target) && event.target !== notificationsToggle) {
                notificationsMenu.classList.remove('show');
            }
        });
        
        // Marquer toutes les notifications comme lues
        if (markAllRead) {
            markAllRead.addEventListener('click', function(event) {
                event.preventDefault();
                const unreadNotifications = document.querySelectorAll('.notification-item.unread');
                unreadNotifications.forEach(notification => {
                    notification.classList.remove('unread');
                });
                
                // Masquer l'indicateur de notification
                const indicator = document.querySelector('.notification-indicator');
                if (indicator) {
                    indicator.style.display = 'none';
                }
            });
        }
    }
    
    // Gestion des boutons de favoris dans les offres recommandées
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) { // Si pas encore en favori
                icon.classList.remove('far');
                icon.classList.add('fas');
                // Ajouter à la liste des favoris (localStorage)
                saveToWishlist(getOffreId(this));
            } else { // Si déjà en favori
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Retirer de la liste des favoris
                removeFromWishlist(getOffreId(this));
            }
        });
    });
    
    // Fonctions utilitaires
    function getOffreId(element) {
        // Récupérer l'ID de l'offre à partir de l'élément
        const offerCard = element.closest('.offer-card');
        const link = offerCard.querySelector('.view-btn').getAttribute('href');
        return link.split('=')[1]; // Exemple: "offre-details.html?id=10" -> "10"
    }
    
    function saveToWishlist(offreId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (!wishlist.includes(offreId)) {
            wishlist.push(offreId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            
            // Mettre à jour le compteur de favoris
            updateFavoritesCounter();
        }
    }
    
    function removeFromWishlist(offreId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlist = wishlist.filter(id => id !== offreId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Mettre à jour le compteur de favoris
        updateFavoritesCounter();
    }
    
    function updateFavoritesCounter() {
        const favoritesNav = document.querySelector('.nav-item i.fa-heart').parentElement;
        const badge = favoritesNav.querySelector('.badge');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        if (badge) {
            badge.textContent = wishlist.length;
        }
    }
    
    // Initialisation
    function initDashboard() {
        // Marquer les offres déjà en favoris
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlistButtons.forEach(button => {
            const offreId = getOffreId(button);
            if (wishlist.includes(offreId)) {
                const icon = button.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
        
        // Mettre à jour le compteur de favoris
        updateFavoritesCounter();
    }
    
    initDashboard();
});
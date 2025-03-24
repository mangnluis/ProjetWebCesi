/**
 * Enhanced Dashboard JavaScript
 * Ce fichier contient les fonctionnalités avancées pour les tableaux de bord
 * des différents types d'utilisateurs (étudiant, pilote, admin)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détection du type de tableau de bord
    const isDashboardAdmin = document.body.classList.contains('dashboard-admin');
    const isDashboardPilote = document.body.classList.contains('dashboard-pilote');
    const isDashboardEtudiant = document.body.classList.contains('dashboard-etudiant');
    
    // Initialisation commune à tous les tableaux de bord
    initCommonDashboardFeatures();
    
    // Initialisation spécifique selon le type d'utilisateur
    if (isDashboardAdmin) {
        initAdminDashboard();
    } else if (isDashboardPilote) {
        initPiloteDashboard();
    } else if (isDashboardEtudiant) {
        initEtudiantDashboard();
    }
});

/**
 * Initialise les fonctionnalités communes à tous les tableaux de bord
 */
function initCommonDashboardFeatures() {
    // Gestion des notifications
    initNotifications();
    
    // Gestion du menu utilisateur
    initUserMenu();
    
    // Gestion du menu mobile
    initMobileMenu();
    
    // Affichage de la date actuelle
    updateCurrentDate();
}

/**
 * Initialise le système de notifications
 */
function initNotifications() {
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
            if (notificationsMenu.classList.contains('show') && 
                !notificationsMenu.contains(event.target) && 
                event.target !== notificationsToggle) {
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
                
                // Mettre à jour le stockage local
                localStorage.setItem('lastReadNotification', new Date().toISOString());
            });
        }
        
        // Charger les notifications depuis l'API (simulé)
        loadNotifications();
    }
}

/**
 * Charge les notifications (simulation)
 */
function loadNotifications() {
    // Cette fonction serait normalement utilisée pour charger les notifications depuis l'API
    console.log('Chargement des notifications...');
    
    // Simulation de nouvelles notifications
    setTimeout(() => {
        // Vérifier s'il y a de nouvelles notifications non lues
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        
        if (unreadNotifications.length > 0) {
            // Afficher l'indicateur de notification
            const indicator = document.querySelector('.notification-indicator');
            if (indicator) {
                indicator.style.display = 'block';
            }
        }
    }, 2000);
}

/**
 * Initialise le menu utilisateur
 */
function initUserMenu() {
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', function(event) {
            event.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(event) {
            if (profileDropdown.classList.contains('show') && 
                !profileDropdown.contains(event.target) && 
                !userProfile.contains(event.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }
}

/**
 * Initialise le menu mobile pour le tableau de bord
 */
function initMobileMenu() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && dashboardSidebar) {
        sidebarToggle.addEventListener('click', function() {
            dashboardSidebar.classList.toggle('active');
        });
        
        document.addEventListener('click', function(event) {
            if (dashboardSidebar.classList.contains('active') && 
                !dashboardSidebar.contains(event.target) && 
                event.target !== sidebarToggle) {
                dashboardSidebar.classList.remove('active');
            }
        });
    }
}

/**
 * Met à jour l'affichage de la date actuelle
 */
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

/**
 * Initialise le tableau de bord administrateur
 */
function initAdminDashboard() {
    console.log('Initialisation du tableau de bord administrateur');
    
    // Charger les statistiques globales
    loadAdminStats();
    
    // Gestion des filtres et recherches spécifiques à l'admin
    initAdminFilters();
}

/**
 * Charge les statistiques pour le tableau de bord administrateur
 */
function loadAdminStats() {
    // Simulation de chargement des statistiques
    console.log('Chargement des statistiques administrateur...');
    
    // Ici, vous feriez normalement une requête AJAX pour récupérer les données
    // Cette partie est simulée pour la démonstration
    
    // Simuler une mise à jour périodique des statistiques
    setInterval(() => {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(statValue => {
            // Simuler une variation aléatoire des statistiques
            const currentValue = parseInt(statValue.textContent);
            const variation = Math.floor(Math.random() * 5) - 2; // Variation entre -2 et +2
            const newValue = Math.max(0, currentValue + variation);
            statValue.textContent = newValue;
        });
    }, 300000); // Toutes les 5 minutes
}

/**
 * Initialise les filtres spécifiques à l'administration
 */
function initAdminFilters() {
    const adminSearchInputs = document.querySelectorAll('.admin-search-input');
    
    if (adminSearchInputs.length) {
        adminSearchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const searchValue = this.value.toLowerCase();
                const targetType = this.getAttribute('data-search-target');
                const items = document.querySelectorAll(targetType);
                
                if (items.length) {
                    items.forEach(item => {
                        const text = item.textContent.toLowerCase();
                        if (text.includes(searchValue)) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
}

/**
 * Initialise le tableau de bord pilote
 */
function initPiloteDashboard() {
    console.log('Initialisation du tableau de bord pilote');
    
    // Charger les données des étudiants
    loadStudentData();
    
    // Initialiser le suivi des candidatures
    initApplicationTracking();
    
    // Gestion du changement de promotion
    initPromotionSelection();
}

/**
 * Charge les données des étudiants (pour le pilote)
 */
function loadStudentData() {
    console.log('Chargement des données étudiants...');
    
    // Simulation de chargement des données
    // Dans une application réelle, ce serait une requête AJAX
}

/**
 * Initialise le suivi des candidatures pour le pilote
 */
function initApplicationTracking() {
    // Gestion des boutons d'action sur les candidatures
    const actionButtons = document.querySelectorAll('.action-btn');
    
    if (actionButtons.length) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.querySelector('i').classList.contains('fa-eye') ? 'view' : 'contact';
                const studentName = this.closest('tr').querySelector('td:first-child').textContent;
                
                if (action === 'view') {
                    // Simuler l'affichage des détails de l'étudiant
                    console.log(`Affichage des détails de l'étudiant: ${studentName}`);
                    alert(`Détails de l'étudiant: ${studentName}`);
                } else if (action === 'contact') {
                    // Simuler l'envoi d'un message à l'étudiant
                    console.log(`Contacter l'étudiant: ${studentName}`);
                    alert(`Envoi d'un message à: ${studentName}`);
                }
            });
        });
    }
}

/**
 * Initialise la sélection de promotion pour le pilote
 */
function initPromotionSelection() {
    const promotionSelect = document.getElementById('promotionSelect');
    
    if (promotionSelect) {
        promotionSelect.addEventListener('change', function() {
            const selectedPromotion = this.value;
            
            // Simuler le chargement des données de la promotion sélectionnée
            console.log(`Chargement des données pour la promotion: ${selectedPromotion}`);
            
            // Dans une application réelle, vous feriez une requête AJAX ici
            // pour charger les données spécifiques à la promotion
            
            // Simuler un délai de chargement
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            document.querySelector('.dashboard-content').appendChild(loadingIndicator);
            
            setTimeout(() => {
                loadingIndicator.remove();
                
                // Simuler la mise à jour des statistiques
                updatePiloteStats(selectedPromotion);
            }, 1000);
        });
    }
}

/**
 * Met à jour les statistiques du pilote en fonction de la promotion sélectionnée
 */
function updatePiloteStats(promotion) {
    // Simuler des statistiques différentes selon la promotion
    let stats = {
        students: 42,
        searching: 18,
        confirmed: 24,
        applications: 86
    };
    
    // Modifier les statistiques en fonction de la promotion sélectionnée
    if (promotion === 'info2026') {
        stats = {
            students: 38,
            searching: 28,
            confirmed: 10,
            applications: 52
        };
    } else if (promotion === 'marketing2025') {
        stats = {
            students: 25,
            searching: 12,
            confirmed: 13,
            applications: 47
        };
    } else if (promotion === 'all') {
        stats = {
            students: 105,
            searching: 58,
            confirmed: 47,
            applications: 185
        };
    }
    
    // Mettre à jour l'affichage des statistiques
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 4) {
        statValues[0].textContent = stats.students;
        statValues[1].textContent = stats.searching;
        statValues[2].textContent = stats.confirmed;
        statValues[3].textContent = stats.applications;
    }
    
    // Mettre à jour les pourcentages
    const statDetails = document.querySelectorAll('.stat-detail');
    if (statDetails.length >= 3) {
        const searchingPercentage = Math.round((stats.searching / stats.students) * 100);
        const confirmedPercentage = Math.round((stats.confirmed / stats.students) * 100);
        const avgApplications = (stats.applications / stats.students).toFixed(1);
        
        statDetails[0].innerHTML = `<span class="stat-label">Actifs:</span> ${stats.students}/${stats.students}`;
        statDetails[1].innerHTML = `<span class="stat-label">Pourcentage:</span> ${searchingPercentage}%`;
        statDetails[2].innerHTML = `<span class="stat-label">Pourcentage:</span> ${confirmedPercentage}%`;
        statDetails[3].innerHTML = `<span class="stat-label">Moy. par étudiant:</span> ${avgApplications}`;
    }
    
    // Mettre à jour le graphique de progression
    updateProgressChart(stats);
}

/**
 * Met à jour le graphique de progression des étudiants
 */
function updateProgressChart(stats) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const confirmedPercentage = Math.round((stats.confirmed / stats.students) * 100);
        const waitingPercentage = Math.round((stats.searching * 0.4 / stats.students) * 100);
        const searchingPercentage = Math.round((stats.searching * 0.6 / stats.students) * 100);
        const inactivePercentage = 100 - confirmedPercentage - waitingPercentage - searchingPercentage;
        
        // Mettre à jour les segments de la barre de progression
        const segments = document.querySelectorAll('.progress-segment');
        if (segments.length >= 4) {
            segments[0].style.width = `${confirmedPercentage}%`;
            segments[0].textContent = `${confirmedPercentage}%`;
            
            segments[1].style.width = `${waitingPercentage}%`;
            segments[1].textContent = `${waitingPercentage}%`;
            
            segments[2].style.width = `${searchingPercentage}%`;
            segments[2].textContent = `${searchingPercentage}%`;
            
            segments[3].style.width = `${inactivePercentage}%`;
            segments[3].textContent = `${inactivePercentage}%`;
        }
    }
}

/**
 * Initialise le tableau de bord étudiant
 */
function initEtudiantDashboard() {
    console.log('Initialisation du tableau de bord étudiant');
    
    // Gestion des favoris (wishlist)
    initWishlistSystem();
    
    // Gestion des candidatures
    initApplicationsSystem();
    
    // Recommandations d'offres personnalisées
    initPersonalizedRecommendations();
}

/**
 * Initialise le système de gestion des favoris
 */
function initWishlistSystem() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    if (wishlistButtons.length) {
        // Charger l'état initial des favoris depuis le localStorage
        loadWishlistState();
        
        wishlistButtons.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const offreId = getOffreId(this);
                
                if (icon.classList.contains('far')) { // Si pas encore en favori
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    
                    // Ajouter à la liste des favoris (localStorage)
                    saveToWishlist(offreId);
                    
                    // Afficher une notification
                    showNotification('Offre ajoutée à vos favoris', 'success');
                } else { // Si déjà en favori
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    
                    // Retirer de la liste des favoris
                    removeFromWishlist(offreId);
                    
                    // Afficher une notification
                    showNotification('Offre retirée de vos favoris', 'info');
                }
                
                // Mettre à jour le badge du menu
                updateWishlistBadge();
            });
        });
    }
}

/**
 * Récupère l'ID de l'offre à partir de l'élément
 */
function getOffreId(element) {
    const offreCard = element.closest('.offer-card, .offre-card');
    const link = offreCard.querySelector('.view-btn').getAttribute('href');
    return link.split('=')[1]; // Exemple: "offre-details.html?id=1" -> "1"
}

/**
 * Charge l'état initial des favoris depuis le localStorage
 */
function loadWishlistState() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        const offreId = getOffreId(button);
        if (wishlist.includes(offreId)) {
            const icon = button.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
    });
    
    // Mettre à jour le badge du menu
    updateWishlistBadge();
}

/**
 * Ajoute une offre à la liste des favoris
 */
function saveToWishlist(offreId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.includes(offreId)) {
        wishlist.push(offreId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}
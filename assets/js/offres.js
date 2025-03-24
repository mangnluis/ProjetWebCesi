document.addEventListener('DOMContentLoaded', function() {
    // Gestion du filtrage des offres
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            filterOffres();
        });
        
        // Mettre à jour la valeur affichée du slider de salaire
        const salaryRange = document.getElementById('salaryRange');
        const salaryValue = document.getElementById('salaryValue');
        
        if (salaryRange && salaryValue) {
            salaryRange.addEventListener('input', function() {
                salaryValue.textContent = this.value;
            });
        }
        
        // Bouton de réinitialisation des filtres
        const resetButton = filterForm.querySelector('.reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                filterForm.reset();
                if (salaryValue) {
                    salaryValue.textContent = salaryRange.value;
                }
                // Réafficher toutes les offres
                const offres = document.querySelectorAll('.offre-card');
                offres.forEach(offre => {
                    offre.style.display = 'block';
                });
            });
        }
    }
    
    // Recherche en direct
    const searchInput = document.getElementById('offresSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterOffres();
        });
    }
    
    // Basculement entre vue grille et liste
    const viewToggleButtons = document.querySelectorAll('.toggle-button');
    const offresContainer = document.getElementById('offresContainer');
    
    if (viewToggleButtons.length && offresContainer) {
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                // Supprimer la classe active de tous les boutons
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Changer la vue
                if (view === 'grid') {
                    offresContainer.classList.remove('offres-list-view');
                    offresContainer.classList.add('offres-grid');
                } else {
                    offresContainer.classList.remove('offres-grid');
                    offresContainer.classList.add('offres-list-view');
                }
            });
        });
    }
    
    // Tri des offres
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortOffres(this.value);
        });
    }
    
    // Gestion des favoris
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
    
    // Pagination
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    if (paginationNumbers.length) {
        paginationNumbers.forEach(button => {
            button.addEventListener('click', function() {
                paginationNumbers.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Charger la page correspondante (à implémenter selon votre logique)
                loadPage(this.textContent);
            });
        });
        
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (!this.disabled) {
                    const activePage = document.querySelector('.pagination-number.active');
                    const prevPage = activePage.previousElementSibling;
                    if (prevPage && prevPage.classList.contains('pagination-number')) {
                        activePage.classList.remove('active');
                        prevPage.classList.add('active');
                        loadPage(prevPage.textContent);
                    }
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (!this.disabled) {
                    const activePage = document.querySelector('.pagination-number.active');
                    const nextPage = activePage.nextElementSibling;
                    if (nextPage && nextPage.classList.contains('pagination-number')) {
                        activePage.classList.remove('active');
                        nextPage.classList.add('active');
                        loadPage(nextPage.textContent);
                    }
                }
            });
        }
    }
    
    // Fonctions utilitaires
    function filterOffres() {
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedSkills = getSelectedCheckboxes('skill');
        const selectedDurations = getSelectedCheckboxes('duration');
        const minSalary = salaryRange ? parseInt(salaryRange.value) : 0;
        
        const offres = document.querySelectorAll('.offre-card');
        
        offres.forEach(offre => {
            const title = offre.querySelector('.offre-title').textContent.toLowerCase();
            const company = offre.querySelector('.offre-company').textContent.toLowerCase();
            const skills = Array.from(offre.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
            
            // Recherche par texte
            const matchesSearch = searchValue === '' || 
                                 title.includes(searchValue) || 
                                 company.includes(searchValue);
            
            // Filtre par compétences
            const matchesSkills = selectedSkills.length === 0 || 
                                 selectedSkills.some(skill => skills.some(s => s.includes(skill)));
            
            // Filtre par durée (à adapter selon votre structure)
            const duration = offre.querySelector('.offre-duration')?.textContent.toLowerCase() || '';
            const matchesDuration = selectedDurations.length === 0 || 
                                   selectedDurations.some(d => duration.includes(d));
            
            // Filtre par salaire
            const salaryText = offre.querySelector('.offre-salary')?.textContent || '';
            const salary = parseInt(salaryText.match(/\d+/)[0] || '0');
            const matchesSalary = salary >= minSalary;
            
            // Afficher ou masquer l'offre
            if (matchesSearch && matchesSkills && matchesDuration && matchesSalary) {
                offre.style.display = 'block';
            } else {
                offre.style.display = 'none';
            }
        });
    }
    
    function getSelectedCheckboxes(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                    .map(checkbox => checkbox.value.toLowerCase());
    }
    
    function sortOffres(sortBy) {
        const offresContainer = document.getElementById('offresContainer');
        const offres = Array.from(offresContainer.querySelectorAll('.offre-card'));
        
        offres.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    // Tri par date (plus récentes en premier)
                    // À adapter selon votre structure de données
                    return -1; // Exemple simpliste
                case 'date-asc':
                    // Tri par date (plus anciennes en premier)
                    return 1; // Exemple simpliste
                case 'salary-desc':
                    // Tri par salaire (du plus élevé au plus bas)
                    const salaryA = parseInt(a.querySelector('.offre-salary')?.textContent.match(/\d+/)[0] || '0');
                    const salaryB = parseInt(b.querySelector('.offre-salary')?.textContent.match(/\d+/)[0] || '0');
                    return salaryB - salaryA;
                case 'salary-asc':
                    // Tri par salaire (du plus bas au plus élevé)
                    const salaryC = parseInt(a.querySelector('.offre-salary')?.textContent.match(/\d+/)[0] || '0');
                    const salaryD = parseInt(b.querySelector('.offre-salary')?.textContent.match(/\d+/)[0] || '0');
                    return salaryC - salaryD;
                default:
                    return 0;
            }
        });
        
        // Réorganiser les offres dans le DOM
        offres.forEach(offre => {
            offresContainer.appendChild(offre);
        });
    }
    
    function getOffreId(element) {
        // Récupérer l'ID de l'offre à partir de l'élément (à adapter selon votre structure)
        const offreCard = element.closest('.offre-card');
        const link = offreCard.querySelector('.view-btn').getAttribute('href');
        return link.split('=')[1]; // Exemple: "offre-details.html?id=1" -> "1"
    }
    
    function saveToWishlist(offreId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (!wishlist.includes(offreId)) {
            wishlist.push(offreId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }
    
    function removeFromWishlist(offreId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlist = wishlist.filter(id => id !== offreId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    
    function loadPage(pageNumber) {
        // Charger la page correspondante (à implémenter selon votre logique)
        console.log('Chargement de la page ' + pageNumber);
        // Cette fonction serait normalement utilisée pour une requête AJAX
        // ou pour afficher/masquer des éléments selon la pagination
    }
    
    // Initialisation
    function initOffrePage() {
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
    }
    
    initOffrePage();
});
document.addEventListener('DOMContentLoaded', function() {
    // Recherche d'entreprises
    const searchInput = document.getElementById('entrepriseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();
            const entreprises = document.querySelectorAll('.entreprise-card');
            
            entreprises.forEach(entreprise => {
                const name = entreprise.querySelector('.entreprise-name').textContent.toLowerCase();
                const location = entreprise.querySelector('.entreprise-location').textContent.toLowerCase();
                const tags = Array.from(entreprise.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                // Vérifier si le texte de recherche correspond à l'entreprise
                const matches = name.includes(searchValue) || 
                               location.includes(searchValue) || 
                               tags.some(tag => tag.includes(searchValue));
                
                // Afficher ou masquer l'entreprise
                entreprise.style.display = matches ? 'flex' : 'none';
            });
        });
    }
    
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
    function loadPage(pageNumber) {
        // Charger la page correspondante (à implémenter selon votre logique)
        console.log('Chargement de la page ' + pageNumber);
        // Cette fonction serait normalement utilisée pour une requête AJAX
        // ou pour afficher/masquer des éléments selon la pagination
    }
});
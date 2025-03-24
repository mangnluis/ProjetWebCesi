document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const strengthProgress = document.getElementById('strengthProgress');
    const strengthText = document.getElementById('strengthText');
    
    if (registerForm) {
        // Vérification de la force du mot de passe
        if (passwordInput && strengthProgress && strengthText) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const strength = checkPasswordStrength(password);
                
                // Mise à jour de la barre de progression
                strengthProgress.style.width = strength.percent + '%';
                strengthProgress.style.backgroundColor = strength.color;
                strengthText.textContent = strength.text;
            });
        }
        
        // Soumission du formulaire
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validation des champs
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            if (!validateEmail(email)) {
                showError('Veuillez entrer une adresse email valide.');
                return;
            }
            
            if (password.length < 8) {
                showError('Le mot de passe doit contenir au moins 8 caractères.');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Les mots de passe ne correspondent pas.');
                return;
            }
            
            if (!terms) {
                showError('Vous devez accepter les conditions d\'utilisation et la politique de confidentialité.');
                return;
            }
            
            // Simulation d'inscription (à remplacer par l'appel API réel)
            const userType = document.querySelector('input[name="userType"]:checked').value;
            console.log('User Type:', userType);
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Email:', email);
            console.log('Password:', password);
            
            // Redirection vers la page de connexion ou l'étape suivante
            alert('Votre compte a été créé avec succès ! Vous allez être redirigé vers la page de connexion.');
            window.location.href = 'connexion.html';
        });
    }
    
    // Gestion du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validation des champs
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!validateEmail(email)) {
                showError('Veuillez entrer une adresse email valide.');
                return;
            }
            
            if (password.length < 6) {
                showError('Le mot de passe doit contenir au moins 6 caractères.');
                return;
            }
            
            // Simulation de connexion (à remplacer par l'appel API réel)
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Remember me:', document.getElementById('remember').checked);
            
            // Redirection vers le tableau de bord approprié
            if (email.includes('admin')) {
                window.location.href = 'profil/admin.html';
            } else if (email.includes('pilote')) {
                window.location.href = 'profil/pilote.html';
            } else {
                window.location.href = 'profil/etudiant.html';
            }
        });
    }
    
    // Fonctions utilitaires
    function checkPasswordStrength(password) {
        // Critères de force
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
        const isLongEnough = password.length >= 8;
        
        // Calcul du score
        let score = 0;
        if (hasLowerCase) score++;
        if (hasUpperCase) score++;
        if (hasNumbers) score++;
        if (hasSpecialChars) score++;
        if (isLongEnough) score++;
        
        // Détermination de la force
        let result = {
            percent: 0,
            color: '#ff4d4d',
            text: 'Très faible'
        };
        
        if (password.length === 0) {
            result.text = 'Force du mot de passe';
        } else if (score === 1) {
            result.percent = 20;
            result.text = 'Très faible';
        } else if (score === 2) {
            result.percent = 40;
            result.color = '#ffaa00';
            result.text = 'Faible';
        } else if (score === 3) {
            result.percent = 60;
            result.color = '#ffaa00';
            result.text = 'Moyen';
        } else if (score === 4) {
            result.percent = 80;
            result.color = '#2bd150';
            result.text = 'Fort';
        } else if (score === 5) {
            result.percent = 100;
            result.color = '#2bd150';
            result.text = 'Très fort';
        }
        
        return result;
    }
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function showError(message) {
        alert(message); // À remplacer par une notification plus élégante
    }
});
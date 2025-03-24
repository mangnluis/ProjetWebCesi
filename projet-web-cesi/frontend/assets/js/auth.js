// This file contains JavaScript functions related to authentication, such as form submission and validation.

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validate form inputs
            if (validateEmail(email) && validatePassword(password)) {
                // Send login request to the backend
                fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle successful login (e.g., redirect to dashboard)
                    window.location.href = '/dashboard.html';
                })
                .catch(error => {
                    // Handle errors (e.g., show error message)
                    alert(error.message);
                });
            } else {
                alert('Veuillez entrer des informations valides.');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 6; // Example validation: password must be at least 6 characters
    }
});
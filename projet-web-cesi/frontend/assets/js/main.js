// This file contains the main JavaScript logic for the frontend application.

// Function to handle form submission for login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validation (basic example)
    if (email === '' || password === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Prepare data for submission
    const data = {
        email: email,
        password: password
    };

    // Send a POST request to the backend for authentication
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful login (e.g., redirect to dashboard)
        alert('Connexion réussie !');
        window.location.href = '/dashboard.html'; // Redirect to the dashboard
    })
    .catch(error => {
        // Handle errors (e.g., display error message)
        alert(error.message);
    });
});
# Projet Web Cesi

## Description
Ce projet est une plateforme web nommée "TrouveTonStage" qui connecte les étudiants aux meilleures opportunités de stage. Il est divisé en deux parties : le backend et le frontend.

## Structure du projet
```
projet-web-cesi
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   └── entrepriseController.js
│   │   ├── models
│   │   │   ├── User.js
│   │   │   ├── Entreprise.js
│   │   │   └── Admin.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── entrepriseRoutes.js
│   │   ├── config
│   │   │   └── db.js
│   │   └── app.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── pages
│   │   ├── connexion.html
│   │   ├── login.html
│   │   ├── offres.html
│   │   └── entreprises.html
│   ├── assets
│   │   ├── css
│   │   │   └── styles.css
│   │   ├── js
│   │   │   ├── main.js
│   │   │   └── auth.js
│   └── README.md
└── .gitignore
```

## Installation

### Backend
1. Naviguez dans le dossier `backend`.
2. Exécutez `npm install` pour installer les dépendances.
3. Configurez votre base de données dans `src/config/db.js`.
4. Lancez le serveur avec `node src/app.js`.

### Frontend
1. Naviguez dans le dossier `frontend`.
2. Ouvrez le fichier `pages/index.html` dans votre navigateur pour accéder à l'application.

## Fonctionnalités
- Authentification des utilisateurs (connexion et inscription).
- Gestion des utilisateurs (création, mise à jour, récupération).
- Gestion des entreprises (création, mise à jour, récupération).
- Affichage des offres de stage.

## Contribuer
Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.

## License
Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus de détails.
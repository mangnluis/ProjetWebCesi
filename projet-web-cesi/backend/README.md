# Backend Project Documentation

## Overview
This backend project is designed to support the TrouveTonStage platform, providing functionalities for user authentication, management of users and entreprises, and database interactions.

## Project Structure
The backend is organized into the following directories and files:

- **src/**: Contains the main application code.
  - **controllers/**: Contains the logic for handling requests.
    - `authController.js`: Handles authentication-related requests.
    - `userController.js`: Manages user-related operations.
    - `entrepriseController.js`: Manages entreprise-related operations.
  - **models/**: Contains the data models for the application.
    - `User.js`: Defines the User model.
    - `Entreprise.js`: Defines the Entreprise model.
    - `Admin.js`: Defines the Admin model.
  - **routes/**: Contains the route definitions for the application.
    - `authRoutes.js`: Sets up authentication routes.
    - `userRoutes.js`: Sets up user-related routes.
    - `entrepriseRoutes.js`: Sets up entreprise-related routes.
  - **config/**: Contains configuration files.
    - `db.js`: Handles database connection logic.
  - `app.js`: The main entry point for the application.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd projet-web-cesi/backend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure Database**
   Update the database connection settings in `src/config/db.js` with your database credentials.

4. **Run the Application**
   Start the server using:
   ```bash
   node src/app.js
   ```
   The server will run on the specified port (default is 3000).

## Usage Guidelines
- **Authentication**: Use the endpoints defined in `authRoutes.js` for user login and registration.
- **User Management**: Access user-related functionalities through the routes in `userRoutes.js`.
- **Entreprise Management**: Use the routes in `entrepriseRoutes.js` to manage entreprise data.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
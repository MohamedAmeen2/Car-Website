# Car-Website
This project is a web-based Car Rental System built using Node.js and Express.js, designed to manage car rentals, users, and administrative operations in an organized and secure way.  
Project Purpose:
The system allows users to register, log in, browse available cars, and rent them, while administrators can manage cars, users, and rental operations. It follows a structured backend architecture suitable for real-world applications.
Key Features:
User Authentication
User registration (Sign Up)
User login (Sign In)
Secure handling of credentials

Car Management:
Add, update, delete, and view cars
Store car details such as model, availability, and pricing
User Management
View and manage user accounts
Role-based access (Admin vs User)

Admin Control:
Admin-only routes protected by middleware
Ability to manage cars and users

Database Integration:
Uses a database (via db.js) to store users and car data
Models defined for User and Car

Security:
Environment variables (.env)
Middleware for admin authorization
Separation of secrets and configuration

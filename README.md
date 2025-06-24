# intern-FinalProject

SecureNotes – A Privacy-Focused Note-Taking Application
Project Title:
SecureNotes – A Privacy-Focused Note-Taking Web Application with Client-Side Encryption

Technologies Used:

Frontend: HTML, CSS, JavaScript (developed in Visual Studio Code)

Backend: Java with Spring Tool Suite (STS) using Spring Boot framework

Database: MySQL

Version Control: Git 

Project Overview:
SecureNotes is a secure, user-friendly web-based note-taking application designed with privacy at its core. The application enables users to create, edit, pin, and manage personal notes that are encrypted on the client-side before being saved to the backend. The goal is to provide a secure and intuitive platform for storing confidential information, protected from unauthorized access.

Frontend Features:

Responsive UI with professional styling

Add, edit, and delete notes

Set password-based encryption for individual notes

Pin important notes for quick access

Search functionality to quickly locate notes

Import/Export notes as JSON for portability

Modal interface for creating and editing notes

Smooth animations and modern design aesthetics

Backend Features (Spring Boot + MySQL):

Secure REST APIs for user authentication, note storage, and retrieval

Token-based user session management (e.g., JWT if implemented)

Encrypted data handling and storage using industry-standard cryptographic libraries

MySQL database for persistent storage of notes and user accounts

File upload/download for importing and exporting encrypted notes

Validation and sanitization of incoming data for security

Security Highlights:

Notes are encrypted in the browser before being sent to the server

Passwords and sensitive data are never stored in plain text

Optional password protection on a per-note basis

Role-based access control and user isolation in the backend

Development Tools:

Visual Studio Code: For frontend development

Spring Tool Suite (STS): For backend development

MySQL Workbench: For managing database schemas and queries

Conclusion:
SecureNotes demonstrates a full-stack implementation of a secure note-taking application combining modern UI/UX design with robust backend security. It is ideal for users who value privacy and want control over their personal data. The project reflects core principles of cybersecurity, user-centric design, and full-stack web development.

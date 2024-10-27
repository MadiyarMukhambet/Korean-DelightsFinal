# Korean Delights - User Authentication System

This project is a simple, front-end-based user authentication system designed for the "Korean Delights" website. It allows users to register, log in, and log out, with user information stored in the browser’s local storage. The project includes forms for registration and login, as well as simple session management using JavaScript.

## Key Features

- User Registration: Users can create an account by providing a username, email, and password. Registration information is validated and securely stored in localStorage.
  
- Login System: Registered users can log in with their email and password. If the credentials match the stored information, they are granted access, and their session remains active across page reloads.

- Session Management: The authentication state is stored in localStorage under the isLoggedIn key. This ensures users stay logged in as long as they don’t manually log out or clear their local storage.

- User Preferences: After logging in, user-specific preferences, such as the username and email, are retained in localStorage. These preferences can be easily accessed across different pages, allowing a personalized experience.

- Logout Functionality: Users can log out with a single click, which clears the session data and redirects them to the login page.

## Technologies Used

- HTML5 and CSS3 for the front-end structure and styling.
- Bootstrap for responsive design and layout.
- JavaScript for user validation, authentication, and session management using localStorage.

## Getting Started

1. Clone the repository and open the files locally.
2. Open register.html to create a new user account.
3. Log in via login.html with the registered credentials to test the session management.
4. Use the logout button to end the session.

## Future Improvements

- Add backend support for more secure authentication and user data storage.
- Improve error handling and validation messages.
- Include user-specific settings and preferences that persist across sessions.
  
---

This project is a fundamental example of front-end user authentication suitable for beginner projects in web development.
 

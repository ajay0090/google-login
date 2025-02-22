# Google Login in React Application

This project demonstrates how to integrate **Google Login** in a React.js application. It uses Google OAuth 2.0 to authenticate users and fetch their information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow the steps below to get the project up and running on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/ajay0090/google-login.git
```

### 2. Navigate to the Project Directory

After cloning the repository, navigate into the project folder.

```bash
cd google-login
```

### 3. Install Dependencies

This project uses npm to manage dependencies. Run the following command to install the required dependencies:

```bash
npm install
```

### 4. Set Up Google API Credentials

To make the Google Login work, you need to have your Google API credentials. Follow these steps to set them up:

Go to the Google Cloud Console.
Create a new project (or use an existing one).
Enable the Google+ API (or Google Identity Services).
Generate an OAuth 2.0 Client ID for your web application.
Replace your the client_id in the environment variables with REACT_APP_GOOGLE_CLIENT_ID.

### 5. Start the Development Server

Now, you're ready to run the application locally. Start the development server by running the following command:

```bash
npm start
```

This will start the React development server at http://localhost:3000.

## Usage

When the app is running, you will see a Google Login Button.
Clicking the button will allow you to authenticate with your Google account.
After successful authentication, you will see your Google profile information.

### Key Features:

Google OAuth 2.0 authentication.
Fetch user data after successful login.
Use the data to personalize the user experience in your application.

## Contributing

Contributions are welcome! If you'd like to contribute, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Create a new pull request.

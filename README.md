# 1.45 - Silicon Valley Movie Marathon Club

This is a full-stack web application for managing a movie marathon club. It allows users to view club activities, apply for membership, and for admins to manage activities and members. The project consists of:

- **Frontend:** React-based SPA in [`clubReact`](clubReact)
- **Backend:** Node.js/Express API in [`clubServer`](clubServer)
- **Static Site:** Simple HTML/CSS/JS version in [`clubProject`](clubProject)

---

## Features

- View upcoming and past club activities
- Apply for club membership
- Admin panel for managing activities and members
- User authentication and session management

---

## Project Structure

```
clubProject/   # Static HTML/CSS/JS version
clubReact/     # React frontend (SPA)
clubServer/    # Node.js/Express backend API
```

---

## Getting Started (Local Development)

### Prerequisites

- Node.js (v12+ recommended)
- npm

### 1. Install dependencies

```
cd clubReact
npm install
cd ../clubServer
npm install
```

### 2. Start the backend server

```
cd clubServer
node clubServer.js
```
The backend will run on [http://localhost:3049](http://localhost:3049).

### 3. Start the React frontend

```
cd ../clubReact
node devProxy.js
```
The frontend will run on [http://127.0.0.1:3049](http://127.0.0.1:3049) and proxy API requests to the backend.

### 4. Open the app

Visit [http://127.0.0.1:3049](http://127.0.0.1:3049) in your browser.

---

## Running Tests

Backend tests are located in [`clubServer/test`](clubServer/test):

```
cd clubServer
npm install
npm test
```

---


## License

- Font: [Cormorant Garamond](https://github.com/CatharsisFonts/Cormorant) under SIL Open Font License 1.1
- Code: ISC License

---

## Author

Shweta Khera

# WanderLust 🧳

A full-stack Airbnb clone named **WanderLust**, built with Node.js, Express, MongoDB, EJS, and more. It allows users to list stays, upload photos, write reviews, and browse listings seamlessly.

---

## 🚀 Live Demo

Check out the running app here:  
`https://<your-deployment-url>/listings`

---

## Features

- **User Authentication**: Secure sign-up, login & logout using Passport.js (local strategy).
- **Listing Management**: Create, edit, and delete listings with multiple image uploads.
- **Review System**: Leave reviews and ratings; users can delete their own.
- **Image Storage**: Hosted on Cloudinary via multer storage.
- **Flash Messages**: Real-time feedback for user actions.
- **Responsive UI**: Looks great on both desktop and mobile.

---

## 🧰 Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Backend      | Node.js, Express.js           |
| Database     | MongoDB with Mongoose         |
| Authentication | Passport.js                |
| Storage      | Cloudinary + multer          |
| Templating   | EJS                           |
| Frontend     | HTML, CSS, JavaScript, Bootstrap |
| Utilities    | dotenv, Joi (schema validation), connect-flash, express-session |
| Architecture | MVC pattern                   |

---

---

## 🔧 Installation & Setup

1. Clone the repo

   ```bash
   git clone https://github.com/Shahji-01/Airbnb-Clone-WanderLust.git
   cd Airbnb-Clone-WanderLust

2. Install dependencies

  bash
  npm install

3. Setup environment

Create a .env file:
  env
  PORT=3000
  MONGO_URL=<Your MongoDB connection string>
  SESSION_SECRET=<Your session secret string>
  CLOUD_NAME=<Your Cloudinary cloud name>
  CLOUD_API_KEY=<Your Cloudinary API key>
  CLOUD_API_SECRET=<Your Cloudinary API secret>

4. Run the app

npm start
App will be available at http://localhost:3000.

✨ Usage Guide
Register or log in.

Create a new listing:

Include title, description, price, location, and images.

Browse, view, edit, or delete listings.

Leave a review on any listing.

View all your listings and reviews from your profile.

Log out when done.

🤝 Contributing
Fork the repo

Create a feature branch

Make your changes & commit

Open a Pull Request

Contributions are welcome and appreciated!

🙏 Acknowledgements
Inspired by Airbnb’s core features.

Built to practice full-stack development with Node.js, Express, MongoDB, EJS, Passport, and Cloudinary.

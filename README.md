# QuickBites

QuickBites is a full-stack web application designed to help users order food online from their favorite restaurants. The platform supports multiple features including restaurant management, user profiles, order tracking, and secure payment processing via Stripe.

## Demo
Check out the live demo at: [QuickBites Demo](https://quickbites-frontend-181z.onrender.com)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Authentication and Authorization via Auth0
- Responsive design for both mobile and desktop users
- Restaurant management for restaurant owners (CRUD operations)
- Food ordering system with a shopping cart
- Secure payment system using Stripe
- Real-time order tracking with status updates
- Advanced search filters including pagination, sorting, and cuisine filtering

## Tech Stack
**Frontend**:
- React (with React Router for navigation)
- TailwindCSS for styling
- Auth0 for authentication

**Backend**:
- Node.js with Express.js
- MongoDB for database
- Cloudinary for media storage (restaurant images)
- Stripe for payment processing

## Installation

### Project Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/prayag2002/quickbites.git
   cd quickbites
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` and configure your environment variables (MongoDB URI, Auth0, Stripe, etc.).

4. Start Backend:
   ```bash
   cd backend
   npm run dev
   ```

5. Start Frontend:
   ```bash
   cd frontend
   npm run dev
   ```


### Database Setup
1. Make sure MongoDB is running on your local machine or configure it via MongoDB Atlas.
2. Update your MongoDB connection string in your backend `.env` file.

## Deployment
- **Backend**: The backend is deployed on [Render](https://render.com).
- **Frontend**: The frontend can be deployed using services like Render or Vercel or Netlify.

## Changelog
### v1.0.0
- Initial release with core functionalities:
  - Authentication (Auth0)
  - User Profiles
  - Restaurant Management
  - Search, Filter, and Order System
  - Payment Integration (Stripe)

## Contributing
Feel free to open issues or submit pull requests if you'd like to contribute to this project. Please adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

## License
This project is licensed under the MIT License.

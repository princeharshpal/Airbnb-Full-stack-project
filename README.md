# Wanderlust - Airbnb Clone

Wanderlust is a web application built using Node.js, Express, MongoDB, and Mapbox, designed to replicate the functionality of Airbnb. It allows users to list their properties, view and book other listings, leave reviews, and manage their own listings. This project demonstrates full-stack web development capabilities using the MERN stack and additional libraries.

## Features

### 1. User Authentication
- **Sign Up / Log In**: Users can register, log in, and maintain sessions using [Passport.js](http://www.passportjs.org/).
- **Session Management**: Users remain logged in until they explicitly log out.

### 2. Property Listings
- **View Listings**: All listings are displayed with their details including price, location, and images.
- **Create Listings**: Authenticated users can create new listings, providing details such as title, description, location, country, price, and an image.
- **Edit Listings**: Listing owners can edit the details of their listings, including updating the image and description.
- **Delete Listings**: Listing owners can delete their listings.

### 3. Reviews
- **Add Reviews**: Authenticated users can add reviews to properties they have stayed in. Reviews include a rating (1-5) and a comment.
- **Delete Reviews**: Users can delete their own reviews.
- **View Reviews**: Each listing shows its associated reviews, including the author’s name and rating.

### 4. Map Integration
- **Map View**: Listings show the property’s location on a map, using [Mapbox](https://www.mapbox.com/) for geolocation. The exact location of the property is revealed only after booking.

### 5. Security
- **Session Management**: Sessions are stored securely using [express-session](https://www.npmjs.com/package/express-session) with MongoDB as the store.
- **Protected Routes**: Some actions (like creating or deleting listings, adding reviews) are restricted to authenticated users only.
- **Authorization Checks**: Only the owner of a listing can edit or delete that listing.

### 6. File Uploads
- **Image Upload**: Property images are uploaded to [Cloudinary](https://cloudinary.com/) and linked to each listing.

### 7. Responsive Design
- The application is fully responsive and optimized for both desktop and mobile devices.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js, express-session
- **Cloud Storage**: Cloudinary (for image uploads)
- **Map Integration**: Mapbox
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: CSS, Bootstrap 
- **Others**: EJS (for templating), Axios (for making HTTP requests)


### To Visit the Project Website
```
https://airbnb-full-stack-project-eqw9.onrender.com/listings
```

### To Clone the project 
   ```bash
   git clone https://github.com/princeharshpal/Airbnb-Full-stack-project
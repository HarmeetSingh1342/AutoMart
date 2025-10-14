## Project Idea & Dataset Selection
**Project Title:** AutoMart – Car Sales Explorer  
**Team Member:** Harmeet Singh  

**Dataset (Kaggle):**  
Car Sales Info – https://www.kaggle.com/datasets/minahilfatima12328/car-sales-info  

**Overview:**  
AutoMart lets users browse, search, and manage car listings. Users can filter cars by manufacturer, fuel type, engine size, year, mileage, and price. Future phases will add authentication, favorites, and recommendations.

## Feature List
Core features planned (Phase 1 only requires dummy routes):

- **Browse Cars (List + Detail):**  
  - `GET /cars` → view all cars  
  - `GET /cars/:id` → view single car detail  

- **CRUD Endpoints (dummy in Phase 1):**  
  - `POST /cars` → add a car  
  - `PUT /cars/:id` → update a car  
  - `DELETE /cars/:id` → delete a car  

- **Filtering & Sorting:**  
  - Filter by manufacturer, fuel type, year range, mileage range, price range  
  - Sort by price, year, mileage  

- **Pagination:**  
  - Support `page` and `limit` query params  

- **Future Features (not Phase 1):**  
  - Authentication (login/register)  
  - Favorites (save and view cars)  
  - Recommendations (rule-based suggestions using budget, year, mileage, fuel)  

## Wireframes / UI Planning
- Basic homepage mockup created (see `/screens/homepage.html`).  
- Includes title, buttons for viewing car dummy data, favorites heading, and non functional search bar 
- To access dummy data and test with postman click the view cars button on homepage and then it will redirect you to the page from where you can GET, POST, and DELETE. Screenshots provided in PDF Document. 
## Project Setup (Code)
- **Node.js + Express project initialized** with `npm init` 
- **Basic routes created** with dummy responses for all planned features:  

GET /cars        → list all cars (with filters, sort, pagination params)
GET /cars/:id    → get single car detail
POST /cars       → add a car (dummy response)
PUT /cars/:id    → update a car (dummy response)
DELETE /cars/:id → delete a car (dummy response)


## Phase 2: Modular Architecture Implementation  

### Objective  
In this phase, the project was expanded into a modular Express.js structure with working CRUD logic, JSON data handling, and input validation.  

### Data Structure  
A new file `data/cars.json` was created as the main data source.  
It contains sample car records with the following fields:  
`id`, `manufacturer`, `model`, `fuel`, `engine`, `year`, `mileage`, and `price`.  

### Folder Architecture  
The project was reorganized into feature-based modules:  
modules/
cars/
middlewares/
create-car-rules.js
update-car-rules.js
models/cars-model.js
routes/cars-routes.js

- The **model** handles all business logic and JSON file operations.  
- The **routes** file defines independent Express routes for CRUD actions.  
- The **middlewares** folder holds validation rules for POST and PUT requests. 
### Server Configuration  
`server.js` now loads the modular routes, parses JSON requests, and serves static files from `/screens`.  
It includes 404 and error-handling middleware and runs at:  
`http://localhost:3000`  

### CRUD Endpoints  
- `GET /cars` – get all cars  
- `GET /cars/:id` – get one car by ID  
- `POST /cars` – add a new car  
- `PUT /cars/:id` – update an existing car  
- `DELETE /cars/:id` – delete a car  

### Validation  
Validation rules using **express-validator** ensure required fields such as `manufacturer`, `model`, `year`, `price`, and `fuel` are present and correctly typed before creating or updating cars.  

### Testing  
All routes were tested using Postman:  
- Successful GET, POST, PUT, DELETE operations return correct status codes (`200`, `201`, `400`, `404`).  
- The JSON file updates automatically when cars are added, updated, or deleted.  
- Validation errors display clear messages when fields are missing or invalid.  

### Frontend Link  
The homepage (`/screens/homepage.html`) is served at `http://localhost:3000/`.  
Clicking **View Cars** opens the live `/cars` endpoint that shows the current car listings.  

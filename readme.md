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

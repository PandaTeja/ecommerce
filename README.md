
# Ecommerce Backend

This is the backend for an ecommerce app. It handles things like managing orders, creating discount codes, and generating statistics.

## Technologies Used

- **Node.js**: Used to build the backend server.
- **Express**: A framework to help build APIs.
- **Axios**: Used to make HTTP requests (for communication between frontend and backend).

## How to Set Up

### 1. Clone the Repository
Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/PandaTeja/ecommerce.git
```

### 2. Go to the Backend Folder
Navigate into the `backend` folder where the backend files are located:

```bash
cd ecommerce/backend
```

### 3. Install the Necessary Dependencies
Install all the required dependencies listed in the `package.json` file:

```bash
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the root folder and add the following environment variables:

```env
PORT=7001
DB_URL=your-database-connection-url
JWT_SECRET=your-jwt-secret
```

### 5. Start the Backend Server
Once everything is set up, run the following command to start the backend server:

```bash
npm start
```

The backend server will be running on [http://localhost:7001](http://localhost:7001).

## API Endpoints

### 1. Get Statistics
**Endpoint**: `GET /api/stats`  
This endpoint returns information like the total number of items, total amount, and any discount codes.

Example response:
```json
{
  "totalItems": 120,
  "totalAmount": 5000,
  "discountCodes": ["DISCOUNT123"],
  "totalDiscountAmount": 200
}
```

### 2. Generate Discount Code
**Endpoint**: `POST /api/generate-discount`  
Generates a discount code after a certain number of orders.

Example request:
```json
{
  "nthOrder": 5,
  "discountPercent": 10
}
```

Example response:
```json
{
  "message": "Discount code generated successfully",
  "discountCode": "DISCOUNT123"
}
```

### 3. Get Orders
**Endpoint**: `GET /api/orders`  
Fetches a list of orders.

Example response:
```json
[
  {
    "orderId": 1,
    "items": [
      { "name": "Product A", "price": 100 },
      { "name": "Product B", "price": 200 }
    ],
    "totalAmount": 300
  }
]
```

### 4. Create Order
**Endpoint**: `POST /api/orders`  
Creates a new order.

Example request:
```json
{
  "items": [
    { "name": "Product A", "price": 100 },
    { "name": "Product B", "price": 200 }
  ],
  "totalAmount": 300
}
```

Example response:
```json
{
  "message": "Order created successfully",
  "orderId": 1
}
```

## Running Tests
To test the app, run the following:

```bash
npm test
```



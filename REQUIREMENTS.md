# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API endpoints
#####  Users
    1. http://localhost:5000/users/                     >> Index route (returns all users) [GET][TOKEN]
    2. http://localhost:5000/users/:id                  >> Show route (returns a specific user) [GET][TOKEN]
    3. http://localhost:5000/users/                     >> Create route (creates a new user) [POST][TOKEN]
    3. http://localhost:5000/users/signup               >> Create route (creates a new user to get token first) [POST]
    4. http://localhost:5000/users/:id                  >> Delete route (deletes a specific user) [DELETE][TOKEN]

#####  Products
    1. http://localhost:5000/products/                  >> Index route (returns all products) [GET]
    1. http://localhost:5000/products/:id               >> Show route (returns a specific product) [GET]
    3. http://localhost:5000/products/                  >> Create route (creates a new product) [POST][TOKEN]
    1. http://localhost:5000/products/:id               >> Delete route (deletes a specific product) [DELETE][TOKEN]
    1. http://localhost:5000/products/top               >> Show top 5 products [GET]
    1. http://localhost:5000/products/category/:name    >> Show product by category [GET]

##### Orders
    1. http://localhost:5000/orders/                    >> Index route (returns all orders) [GET][TOKEN]
    2. http://localhost:5000/orders/:id                 >> Show route (returns a specific order) [GET][TOKEN]
    3. http://localhost:5000/orders/user/:id            >> Show user orders [GET][TOKEN]
    4. http://localhost:5000/orders/user/:id/completed  >> Show completed user orders [GET][TOKEN]
    5. http://localhost:5000/orders                     >> Create route (creates a new order) [POST][TOKEN]
    6. http://localhost:5000/orders/:id/product         >> Create new product (creates a product in a specific order) [POST][TOKEN]
    7. http://localhost:5000/orders/:id                 >> Delete route (deletes a specific order) [DELETE][TOKEN]

### Database Schema
    - TABLES
        - users
            - columnName    - type
            - id            - int(PK)
            - firstName     - VARCHAR
            - lastName      - VARCHAR
            - password      - VARCHAR

        - products
            - columnName    - type
            - id            - int(PK)
            - price         - int
            - category      - text

        - orders
            - columnName    - type          - references
            - id            - int(PK)
            - user_id       - bigint        - users(id)
            - status        - VARCHAR(50)

        - order_products
            - columnName    - type          - references
            - id            - int(PK)
            - order_id      - bigint        - orders(id)
            - product_id    - bigint        - products(id)
            - quantity      - int
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11436707&assignment_repo_type=AssignmentRepo)
# p2-cms-integration-server
CMS Integration - Server

# Branded things API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`

- `GET /products`
- `POST /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `PUT /products/:id`
- `PATCH /products`

- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id `

- `GET /histories`

- `GET /users`
- `GET /users/:id `

`CUSTOMER`
- `POST /customer/register`
- `POST /customer/login`
- `POST /customer/google-login`

- `GET /customer/products`
- `GET /customer/products/:id`

- `GET /customer/favorites`
- `POST /customer/favorites/:id`





&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "user3",
  "email": "user3@gmail.com",
  "password": "password",
  "phoneNumber": "0812345678",
  "address": "Jl. jalan"
}
```

_Response (201 - Created)_

```json
{
    "id": 13,
    "username": "user4",
    "email": "user4@gmail.com",
    "role": "user",
    "phoneNumber": "0812345678",
    "address": "Jl. jalan",
    "updatedAt": "2023-07-13T01:00:12.004Z",
    "createdAt": "2023-07-13T01:00:12.004Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
    "message": "Minimal password 5 characters."
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "user4@gmail.com",
  "password": "password"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Input email and password, please"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```
_Response (404 - NotFound)_
```json
{
    "message": "Email is unregistered"
}
```

&nbsp;

## 2. POST /google-login

Login via social media google

Request:

- headers:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 4. GET /products

Description:
- Get all products from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 2,
        "name": "SHAWL LAPEL BLAZER",
        "description": "Blazer with a shawl collar and long sleeves. Front flap pockets and a welt chest pocket. Matching lining. Fastening at the front with a covered button in matching fabric.",
        "price": 700000,
        "stock": 5,
        "imgUrl": "https://static.zara.net/photos///2023/V/0/1/p/2431/187/430/2/w/750/2431187430_6_1_1.jpg?ts=1676895650480",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2023-07-12T16:54:27.125Z",
        "updatedAt": "2023-07-12T16:54:27.125Z",
        "Category": {
            "id": 1,
            "name": "Blazers"
        },
        "User": {
            "id": 2,
            "email": "user1@gmail.com",
            "role": "admin"
        }
    },
  ...,
]
```

&nbsp;

## 5. POST /products

Description:
- Create new product

Request:

- headers: 

```json
{
 "access_token": "string"
}
```

- body: 

```json
{
  "name": "SATIN SHIRT WITH POLKA DOTS",
  "category": "Shirts",
  "description": "Collared shirt with long sleeves. Button fastening at the front hidden by a placket.",
  "stock": 10,
  "price": 799000,
  "image": "https://static.zara.net/photos///2023/I/0/1/p/9878/172/070/2/w/750/9878172070_1_1_1.jpg?ts=1689172816693",
}
```

_Response (200 - OK)_

```json
{
  "name": "SATIN SHIRT WITH POLKA DOTS",
  "category": "Shirts",
  "description": "Collared shirt with long sleeves. Button fastening at the front hidden by a placket.",
  "stock": 10,
  "price": 799000,
  "imageUrl": "https://static.zara.net/photos///2023/I/0/1/p/9878/172/070/2/w/750/9878172070_1_1_1.jpg?ts=1689172816693",
  "categoryId": 1,
    "authorId": 1,
    "updatedAt": "2023-07-16T17:52:25.955Z",
    "createdAt": "2023-07-16T17:52:25.955Z"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "name must be unique"
}
OR
{
    "message": "Product name is required."
}
OR
{
    "message": "Product description is required."
}
OR
{
    "message": "Product price is required."
}
OR
{
    "message": "Price must be higher than Rp.50.000,-"
}
```

&nbsp;

## 6. GET /products/:id

Description:
- Get product by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "SHORT TEXTURED WEAVE BLAZER",
    "description": "Blazer featuring a lapel collar and long sleeves with shoulder pads. Lapel details on the front. Raised button fastening on the front.",
    "price": 799000,
    "stock": 10,
    "imgUrl": "https://static.zara.net/photos///2023/V/0/1/p/2471/111/070/2/w/750/2471111070_6_1_1.jpg?ts=1674563505073",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2023-07-12T16:54:27.125Z",
    "updatedAt": "2023-07-12T16:54:27.125Z",
    "Category": {
        "id": 1,
        "name": "Blazers"
    },
    "User": {
        "id": 1,
        "email": "admin@gmail.com",
        "role": "admin"
    }
}
```

&nbsp;


## 7. DELETE /products/:id

Description:
- Delete product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "SHAWL LAPEL BLAZER success to delete"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not authorized to delete"
}
```

## 8. PUT /products/:id

Description:
- Update product

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "history": {
        "id": 10,
        "title": "JACQUARD WOOL BLEND COAT - LIMITED EDITION",
        "description": "Product with id 3 has been updated from archieved to archieved",
        "updatedBy": "admin@gmail.com",
        "updatedAt": "2023-07-18T12:47:58.775Z",
        "createdAt": "2023-07-18T12:47:58.775Z"
    },
    "message": "Product with id 3 is updated"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 8. PATCH /products/:id

Description:
- Update product status

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "history": {
        "id": 10,
        "title": "JACQUARD WOOL BLEND COAT - LIMITED EDITION",
        "description": "Product with id 3 has been updated from archieved to archieved",
        "updatedBy": "admin@gmail.com",
        "updatedAt": "2023-07-18T12:47:58.775Z",
        "createdAt": "2023-07-18T12:47:58.775Z"
    },
    "message": "Product with id 3 has been updated from active to archieved"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 9. GET /categories

Description:
- Get all product categories from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "Blazers",
        "createdAt": "2023-07-12T16:54:27.113Z",
        "updatedAt": "2023-07-12T16:54:27.113Z"
    },
    {
        "id": 2,
        "name": "Jackets",
        "createdAt": "2023-07-12T16:54:27.113Z",
        "updatedAt": "2023-07-12T16:54:27.113Z"
    },
    ...,
    ]
```

&nbsp;

## 10. POST /categories

Description:
- Create new category

Request : 
- headers : 
```json
{
    "access_token": "string"
}
```
- body:

```json
{
    "name": "Shorts"
}
```
_Response (200 - OK)_
```json
{
    "id": 7,
    "name": "Shorts",
    "updatedAt": "2023-07-16T17:58:24.612Z",
    "createdAt": "2023-07-16T17:58:24.612Z"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Category is required."
}
```

## 11. DELETE /categories/:id

Description:
- Delete category by Id

Request : 
- headers:

```json
{
    "access_token": "string"
}
```
_Response (200 - OK)_

```json
{
    "message": "Shorts success to delete"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 12. PUT /categories/:id

Description:
- Update category

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Category with id 3 updated"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 13. GET /histories

Description:
- Get histories from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
        "id": 17,
        "title": "SEAMLESS DRESS WITH GATHERED DETAILS",
        "description": "Product with id 4 has been updated from active to archieved",
        "updatedBy": "admin@gmail.com",
        "createdAt": "2023-07-18T13:04:52.629Z",
        "updatedAt": "2023-07-18T13:04:52.629Z"
    },
    {
        "id": 16,
        "title": "JACQUARD WOOL BLEND COAT - LIMITED EDITION",
        "description": "Product with id 3 has been updated from archieved to archieved",
        "updatedBy": "admin@gmail.com",
        "createdAt": "2023-07-18T13:02:36.385Z",
        "updatedAt": "2023-07-18T13:02:36.385Z"
    },
```

&nbsp;

## 14. POST /customer/register

Request:

- body:

```json
{
  "email": "user3@gmail.com",
  "password": "password",
  "phoneNumber": "0812345678",
  "address": "Jl. jalan"
}
```

_Response (201 - Created)_

```json
{
    "id": 3,
    "email": "customer3@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 15. POST /customer/login

Request:

- body:

```json
{
  "email": "user3@gmail.com",
  "password": "password"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Input email and password, please"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```
_Response (404 - NotFound)_
```json
{
    "message": "Email is unregistered"
}
```

&nbsp;

## 16. POST /customer/google-login

Login via social media google

Request:

- headers:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 17. GET /customer/products
Description:
- Get all products from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- query: 

```json
{
  "page": 1
}
```

_Response (200 - OK)_

```json
{
    "totalProducts": 20,
    "totalPage": 3,
    "currentPage": 1,
    "products": [
        {
            "id": 1,
            "name": "SHORT TEXTURED WEAVE BLAZER",
            "description": "Blazer featuring a lapel collar and long sleeves with shoulder pads. Lapel details on the front. Raised button fastening on the front.",
            "price": 799000,
            "stock": 10,
            "imgUrl": "https://static.zara.net/photos///2023/V/0/1/p/2471/111/070/2/w/750/2471111070_6_1_1.jpg?ts=1674563505073",
            "categoryId": 1,
            "authorId": 1,
            "status": "active",
            "createdAt": "2023-07-28T00:35:51.188Z",
            "updatedAt": "2023-07-28T00:35:51.188Z",
            "User": {
                "id": 1,
                "username": "admin",
                "email": "admin@gmail.com",
                "role": "admin",
                "phoneNumber": "0812345678",
                "address": "Jl. jalan",
                "createdAt": "2023-07-28T00:35:51.125Z",
                "updatedAt": "2023-07-28T00:35:51.125Z"
            },
            "Category": {
                "id": 1,
                "name": "Blazers",
                "createdAt": "2023-07-28T00:35:51.066Z",
                "updatedAt": "2023-07-28T00:35:51.066Z"
            }
        },
  ...,
]
}
```

## 17. GET /customer/products/:id

Description:
- Get product by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "SHORT TEXTURED WEAVE BLAZER",
    "description": "Blazer featuring a lapel collar and long sleeves with shoulder pads. Lapel details on the front. Raised button fastening on the front.",
    "price": 799000,
    "stock": 10,
    "imgUrl": "https://static.zara.net/photos///2023/V/0/1/p/2471/111/070/2/w/750/2471111070_6_1_1.jpg?ts=1674563505073",
    "categoryId": 1,
    "authorId": 1,
    "status": "active",
    "createdAt": "2023-07-28T00:35:51.188Z",
    "updatedAt": "2023-07-28T00:35:51.188Z",
    "Category": {
        "id": 1,
        "name": "Blazers"
    },
    "User": {
        "id": 1,
        "email": "admin@gmail.com",
        "role": "admin"
    }
}
```

_Response (404 - NotFound)_
```json
{
    "message": "Data Not Found"
}
```

## 17. GET /customer/favorites

Description:
- Get favorites by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "CustomerId": 1,
        "ProductId": 2,
        "createdAt": "2023-07-28T00:35:51.255Z",
        "updatedAt": "2023-07-28T00:35:51.255Z",
        "Customer": {
            "id": 1,
            "email": "customer1@gmail.com",
            "role": "customer",
            "createdAt": "2023-07-28T00:35:51.202Z",
            "updatedAt": "2023-07-28T00:35:51.202Z"
        },
        "Product": {
            "id": 2,
            "name": "SHAWL LAPEL BLAZER",
            "description": "Blazer with a shawl collar and long sleeves. Front flap pockets and a welt chest pocket. Matching lining. Fastening at the front with a covered button in matching fabric.",
            "price": 700000,
            "stock": 5,
            "imgUrl": "https://static.zara.net/photos///2023/V/0/1/p/2431/187/430/2/w/750/2431187430_6_1_1.jpg?ts=1676895650480",
            "categoryId": 1,
            "authorId": 2,
            "status": "active",
            "createdAt": "2023-07-28T00:35:51.188Z",
            "updatedAt": "2023-07-28T00:35:51.188Z"
        }
    },
    ...,
]
```

## 17. GET /customer/favorites/:id

Description:
- Get favorite by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 20,
    "CustomerId": 1,
    "ProductId": 19,
    "updatedAt": "2023-07-30T21:08:55.078Z",
    "createdAt": "2023-07-30T21:08:55.078Z"
}
```

_Response (404 - NotFound)_
```json
{
    "message": "Data Not Found"
}
```




## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "TUnauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
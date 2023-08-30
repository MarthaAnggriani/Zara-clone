if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const request = require('supertest');
const app = require("../app");
const { sequelize } = require("../models");
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
const { verifyAccessToken, generateAccessToken } = require("../helpers/jwt");
const jwt = require('jsonwebtoken');
let access_token;

beforeAll(async () => {
    try {
        const custData = JSON.parse(fs.readFileSync("./data/customers.json", "utf-8"));
        custData.forEach(e => {
            e.createdAt = e.updatedAt = new Date();
            e.password = hashPassword(e.password);
        });
        const customer = await sequelize.queryInterface.bulkInsert('Customers', custData, {});


        // Categories
        await sequelize.queryInterface.bulkInsert(
            "Categories",
            require("../data/categories.json").map((el) => {
                el.createdAt = el.updatedAt = new Date();
                return el;
            })
        );

        // Users
        await sequelize.queryInterface.bulkInsert(
            "Users",
            require("../data/users.json").map((el) => {
                el.createdAt = el.updatedAt = new Date();
                el.password = hashPassword(el.password);
                return el;
            })
        );

        // Products
        await sequelize.queryInterface.bulkInsert(
            "Products",
            require("../data/products.json").map((el) => {
                el.createdAt = el.updatedAt = new Date();
                return el;
            })
        );

        // generate access_token
        access_token = generateAccessToken({ id: 1 });
        const payload = verifyAccessToken(access_token);
        console.log(payload);

    } catch (error) {
        console.log(error, "Before all error");
    }

})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Products", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete("Categories", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Customers", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

describe("POST customer/register", () => {
    test("customer success to register", async () => {
        try {
            const body = {
                email: "customer3@gmail.com",
                password: "password"
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id", body.id);
            expect(response.body).toHaveProperty("role", body.email);
            expect(response.body).toHaveProperty("password", body.password);
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed caused by email not unique", async () => {
        try {
            const body = {
                email: "customer1@gmail.com",
                password: "password"
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String));
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed,email is empty", async () => {
        try {
            const body = {
                email: "",
                password: "password"
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(400);
            expect(response.status).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Input email and password, please")
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed email is null", async () => {
        try {
            const body = {
                email: null,
                password: "password"
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(400);
            expect(response.status).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Input email and password, please")
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed,password is empty", async () => {
        try {
            const body = {
                email: "customer3@gmail.com",
                password: ""
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(400);
            expect(response.status).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Input email and password, please")
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed,password is null", async () => {
        try {
            const body = {
                email: "customer3@gmail.com",
                password: null
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(400);
            expect(response.status).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Input email and password, please")
        } catch (error) {
            console.log(error);
        }
    })
    test("register failed, format email invalid", async () => {
        try {
            const body = {
                email: "customer3gmailcom",
                password: "password"
            };
            const response = await request(app).post("/customer/register").send(body);
            expect(response.status).toBe(400);
            expect(response.status).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Format email invalid.")
        } catch (error) {
            console.log(error);
        }
    })
})

describe("Login POST /customer/login", () => {
    test("Successfully logged in", async () => {
        const response = await request(app).post("/customer/login").send({
            email: "customer1@gmail.com",
            password: "password",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
        access_token = response.body.access_token;
    });
    test("Incorrect password provided", async () => {
        const response = await request(app).post("/customer/login").send({
            email: "customer1@gmail.com",
            password: "pass",
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
            "message",
            "Invalid email/password"
        );
    });
    test("Email entered is not registered in the database", async () => {
        const response = await request(app).post("/customer/login").send({
            email: "customer99@gmail.com",
            password: "password",
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty(
            "message",
            "Email is unregistered"
        );
    });
});

describe("GET customer/products", () => {
    test("should return array of products and status 200", async () => {
        const response = await request(app).get("/customer/products");
        expect(response.status).toBe(200);
        expect(response.body.products).toBeInstanceOf(Array);
        response.body.products.forEach(e => {
            expect(e).toHaveProperty("id", expect.any(Number));
            expect(e).toHaveProperty("name", expect.any(String));
            expect(e).toHaveProperty("description", expect.any(String));
            expect(e).toHaveProperty("price", expect.any(Number));
            expect(e).toHaveProperty("stock", expect.any(Number));
            expect(e).toHaveProperty("imgUrl", expect.any(String));
            expect(e).toHaveProperty("status", expect.any(String));
            expect(e).toHaveProperty("categoryId");
            expect(e).toHaveProperty("authorId");
            expect(e).toHaveProperty("createdAt", expect.any(String));
            expect(e).toHaveProperty("updatedAt", expect.any(String));
            expect(e).toHaveProperty("Category");
            expect(e).toHaveProperty("User");
        });
        expect(response.body).toHaveProperty("totalProducts", expect.any(Number));
    })

    test("Successfully get the Product with 1 query filter parameter", async () => {
        const response = await request(app).get(
            "/customer/products?filterBy=short"
        );
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("products");
        expect(response.body.products).toBeInstanceOf(Array);
        response.body.products.forEach((e) => {
            expect(e).toHaveProperty("id", expect.any(Number));
            expect(e).toHaveProperty("name", expect.any(String));
            expect(e.name).toMatch(/short/i);
            expect(e).toHaveProperty("description", expect.any(String));
            expect(e).toHaveProperty("price", expect.any(Number));
            expect(e).toHaveProperty("stock", expect.any(Number));
            expect(e).toHaveProperty("imgUrl", expect.any(String));
            expect(e).toHaveProperty("status", expect.any(String));
            expect(e).toHaveProperty("categoryId");
            expect(e).toHaveProperty("authorId");
            expect(e).toHaveProperty("createdAt", expect.any(String));
            expect(e).toHaveProperty("updatedAt", expect.any(String));
            expect(e).toHaveProperty("Category");
            expect(e).toHaveProperty("User");
        });
        expect(response.body).toHaveProperty("totalProducts", expect.any(Number));
    });
    test("Successfully get the Products with a specific page", async () => {
        const response = await request(app).get("/customer/products?page=1");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("products");
        expect(response.body.products).toBeInstanceOf(Array);
        response.body.products.forEach((el) => {
            expect(el).toHaveProperty("id", expect.any(Number));
            expect(el).toHaveProperty("name", expect.any(String));
            expect(el).toHaveProperty("description", expect.any(String));
            expect(el).toHaveProperty("price", expect.any(Number));
            expect(el).toHaveProperty("imgUrl", expect.any(String));
            expect(el).toHaveProperty("authorId");
            expect(el).toHaveProperty("categoryId");
            expect(el).toHaveProperty("status");
            expect(el).toHaveProperty("createdAt", expect.any(String));
            expect(el).toHaveProperty("updatedAt", expect.any(String));
            expect(el).toHaveProperty("User");
            expect(el).toHaveProperty("Category");
        });
        const lengthOfData = response.body.products.length;
        expect(lengthOfData).toBeGreaterThanOrEqual(1);
        expect(response.body).toHaveProperty("totalProducts", expect.any(Number));
    });
    test("Successfully get one Product with specific id", async () => {
        const response = await request(app).get("/customer/products/1");
        console.log(response.body);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("description", expect.any(String));
        expect(response.body).toHaveProperty("price", expect.any(Number));
        expect(response.body).toHaveProperty("imgUrl", expect.any(String));
        expect(response.body).toHaveProperty("authorId");
        expect(response.body).toHaveProperty("categoryId");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
        expect(response.body).toHaveProperty("User");
        expect(response.body.User).toHaveProperty("id", expect.any(Number));
        expect(response.body.User).toHaveProperty("email", expect.any(String));
        expect(response.body.User).toHaveProperty("role", expect.any(String));
        expect(response.body).toHaveProperty("Category");
        expect(response.body.Category).toHaveProperty("id", expect.any(Number));
        expect(response.body.Category).toHaveProperty("name", expect.any(String));
    });
    test("Failed to get Product because the given id parameter does not exist in the database or is invalid", async () => {
        const response = await request(app).get("/customer/products/999");
        console.log(response);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });
})

describe.only("GET and ADD Favorite customer/favorites", () => {
    test("Successfully get specific user's favorites list", async () => {
        const response = await request(app).get("/customer/favorites").set({
            access_token,
        });

        const { id } = verifyAccessToken(access_token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((el) => {
            expect(el).toHaveProperty("id", expect.any(Number));
            expect(el).toHaveProperty("CustomerId", expect.any(Number));
            expect(el.CustomerId).toBe(id);
            expect(el).toHaveProperty("ProductId", expect.any(Number));
            expect(el).toHaveProperty("createdAt", expect.any(String));
            expect(el).toHaveProperty("updatedAt", expect.any(String));
            expect(el).toHaveProperty("Customer");
            expect(el.Customer).toHaveProperty("id", expect.any(Number));
            expect(el.Customer).toHaveProperty("email", expect.any(String));
            expect(el.Customer).toHaveProperty("role", expect.any(String));
            expect(el).toHaveProperty("Product");
            expect(el.Product).toHaveProperty("id", expect.any(Number));
            expect(el.Product).toHaveProperty("name", expect.any(String));
            expect(el.Product).toHaveProperty("description", expect.any(String));
            expect(el.Product).toHaveProperty("price", expect.any(Number));
            expect(el.Product).toHaveProperty("stock", expect.any(Number));
            expect(el.Product).toHaveProperty("imgUrl", expect.any(String));
            expect(el.Product).toHaveProperty("authorId");
            expect(el.Product).toHaveProperty("categoryId");
            expect(el.Product).toHaveProperty("status");
            expect(el.Product).toHaveProperty("createdAt", expect.any(String));
            expect(el.Product).toHaveProperty("updatedAt", expect.any(String));
        });
    });
    test(" Successfully added product by id to favorites list", async () => {
        const response = await request(app).post("/customer/favorites/2").set({
            access_token,
        });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("CustomerId", expect.any(Number));
        expect(response.body).toHaveProperty("ProductId", expect.any(Number));
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    });
    test("Failed to add product to favorite list because id doesn't exist in database", async () => {
        const response = await request(app).post("/customer/favorites/999").set({
            access_token,
        });
        console.log(response);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });
    test("Failed to show favorite list because customer doesn't login)", async () => {
        const response = await request(app).get("/customer/favorites");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
    test("Failed to show favorite list because the provided token is invalid (random string)", async () => {
        const response = await request(app).get("/customer/favorites").set({
            access_token: "randomString",
        });
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
});
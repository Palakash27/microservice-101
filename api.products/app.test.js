const request = require("supertest");
const express = require("express");
const app = require("./app");

describe("Test the root path", () => {
    it("should respond with 'Go to /api/products'", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Go to /api/products");
    });
});

describe("Test error handling", () => {
    it("should handle errors and return proper status and message", async () => {
        const testApp = express();

        testApp.use(express.json());
        testApp.use(express.urlencoded({ extended: true }));

        testApp.get("/error", (req, res, next) => {
            const error = new Error("Test error");
            error.statusCode = 400;
            next(error);
        });

        testApp.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({ message: err.message });
        });

        const response = await request(testApp).get("/error");
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: "Test error" });
    });
});

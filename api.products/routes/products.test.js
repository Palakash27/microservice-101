const app = require("../app");
const request = require("supertest");

const productsService = require("../services/products");

jest.mock("../services/products");

describe("Test the products router", () => {
    it("should return active products", async () => {
        const mockProducts = {
            data: [
                {
                    ProductID: 1,
                    ProductName: "Hat",
                    ProductPhotoURL:
                        "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=100&w=260",
                    ProductStatus: "Active",
                },
                {
                    ProductID: 2,
                    ProductName: "Shoes",
                    ProductPhotoURL:
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=260",
                    ProductStatus: "Active",
                },
                {
                    ProductID: 3,
                    ProductName: "Pants",
                    ProductPhotoURL:
                        "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=100&w=260",
                    ProductStatus: "Active",
                },
            ],
            message: "",
        };
        productsService.fetchActiveProducts.mockResolvedValue(mockProducts);

        const response = await request(app).get("/api/products");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it("should return all products", async () => {
        const mockProducts = {
            data: [
                {
                    ProductID: 1,
                    ProductName: "Hat",
                    ProductPhotoURL:
                        "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=100&w=260",
                    ProductStatus: "Active",
                },
                {
                    ProductID: 2,
                    ProductName: "Shoes",
                    ProductPhotoURL:
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=260",
                    ProductStatus: "Active",
                },
                {
                    ProductID: 3,
                    ProductName: "Pants",
                    ProductPhotoURL:
                        "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=100&w=260",
                    ProductStatus: "Active",
                },
                {
                    ProductID: 4,
                    ProductName: "Shirt",
                    ProductPhotoURL:
                        "https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?q=100&w=260",
                    ProductStatus: "InActive",
                },
                {
                    ProductID: 5,
                    ProductName: "Coat",
                    ProductPhotoURL:
                        "thttps://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=100&w=260",
                    ProductStatus: "InActive",
                },
            ],
            message: "",
        };
        productsService.fetchAllProducts.mockResolvedValue(mockProducts);

        const response = await request(app).get("/api/products/all");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it("should handle errors when fetching active products", async () => {
        productsService.fetchActiveProducts.mockRejectedValue(
            new Error("Failed to fetch active products")
        );

        const response = await request(app).get("/api/products");
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
            message: "Failed to fetch active products",
        });
    });

    it("should handle errors when fetching all products", async () => {
        productsService.fetchAllProducts.mockRejectedValue(
            new Error("Failed to fetch all products")
        );

        const response = await request(app).get("/api/products/all");
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
            message: "Failed to fetch all products",
        });
    });

    it("should return 404 for unknown routes", async () => {
        const response = await request(app).get("/api/products/unknown");
        expect(response.statusCode).toBe(404);
    });
});

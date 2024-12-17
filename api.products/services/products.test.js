const db = require("./db");
const helper = require("../helper");
const productsService = require("./products");

jest.mock("./db");
jest.mock("../helper");

describe("Products service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch active products", async () => {
        const mockRows = [
            { ProductID: 1, ProductName: "Hat", ProductStatus: "Active" },
        ];
        db.query.mockResolvedValue(mockRows);
        helper.emptyOrRows.mockReturnValue(mockRows);

        const result = await productsService.fetchActiveProducts();
        expect(db.query).toHaveBeenCalledWith(
            "SELECT * FROM Product WHERE ProductStatus = ?",
            ["active"]
        );
        expect(helper.emptyOrRows).toHaveBeenCalledWith(mockRows);
        expect(result).toEqual({ data: mockRows, message: "" });
    });

    it("should handle errors when fetching active products", async () => {
        db.query.mockRejectedValue(new Error("Database error"));
        helper.emptyOrRows.mockReturnValue([]);

        const result = await productsService.fetchActiveProducts();
        expect(db.query).toHaveBeenCalledWith(
            "SELECT * FROM Product WHERE ProductStatus = ?",
            ["active"]
        );
        expect(result).toEqual({
            data: [],
            message: "Error fetching active products",
        });
    });

    it("should fetch all products", async () => {
        const mockRows = [
            { ProductID: 1, ProductName: "Hat", ProductStatus: "Active" },
            { ProductID: 2, ProductName: "Shoes", ProductStatus: "Inactive" },
        ];
        db.query.mockResolvedValue(mockRows);
        helper.emptyOrRows.mockReturnValue(mockRows);

        const result = await productsService.fetchAllProducts();
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM Product");
        expect(helper.emptyOrRows).toHaveBeenCalledWith(mockRows);
        expect(result).toEqual({ data: mockRows, message: "" });
    });

    it("should handle errors when fetching all products", async () => {
        db.query.mockRejectedValue(new Error("Database error"));
        helper.emptyOrRows.mockReturnValue([]);

        const result = await productsService.fetchAllProducts();
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM Product");
        expect(result).toEqual({
            data: [],
            message: "Error fetching all products",
        });
    });
});

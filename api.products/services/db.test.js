const mariadb = require("mariadb");
const db = require("./db");

jest.mock("mariadb", () => {
    const mConnection = {
        query: jest.fn(),
        release: jest.fn(),
    };
    const mPool = {
        getConnection: jest.fn(() => mConnection),
    };
    return {
        createPool: jest.fn(() => mPool),
    };
});

describe("Database query function", () => {
    let pool;
    let connection;

    beforeAll(() => {
        pool = mariadb.createPool();
        connection = pool.getConnection();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should execute a query and return results", async () => {
        const mockResults = [{ id: 1, name: "Test Product" }];
        connection.query.mockResolvedValue(mockResults);

        const sql = "SELECT * FROM Product";
        const params = [];

        const results = await db.query(sql, params);
        expect(results).toEqual(mockResults);
        expect(pool.getConnection).toHaveBeenCalledTimes(1);
        expect(connection.query).toHaveBeenCalledWith(sql, params);
        expect(connection.release).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the query fails", async () => {
        const mockError = new Error("Query failed");
        connection.query.mockRejectedValue(mockError);

        const sql = "SELECT * FROM Product";
        const params = [];

        await expect(db.query(sql, params)).rejects.toThrow("Query failed");
        expect(pool.getConnection).toHaveBeenCalledTimes(1);
        expect(connection.query).toHaveBeenCalledWith(sql, params);
        expect(connection.release).toHaveBeenCalledTimes(1);
    });

    it("should release the connection even if there is an error", async () => {
        const mockError = new Error("Query failed");
        connection.query.mockRejectedValue(mockError);

        const sql = "SELECT * FROM Product";
        const params = [];

        try {
            await db.query(sql, params);
        } catch (err) {}

        expect(connection.release).toHaveBeenCalledTimes(1);
    });
});

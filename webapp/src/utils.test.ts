import { truncateName } from "./utils";

describe("Test for truncateName method", () => {
    it("should return the same string if the string is shorter than the max length", () => {
        const name = "hello";
        const result = truncateName(name);
        expect(result).toBe(name);
    });

    it("should return the truncated string to 20 characters if the string is longer than the max length", () => {
        const name =
            "hello world, this is the long string which exceeds the max length";
        const result = truncateName(name);
        expect(result).toBe(name.substring(0, 20) + "...");
    });

    it("should return the full string if max character length is equal to string length", () => {
        const name =
            "hello world, this is the long string which exceeds the max length";
        const result = truncateName(name, name.length);
        expect(result).toBe(name);
    });
});

const { emptyOrRows } = require("./helper");

describe("emptyOrRows", () => {
    it("should return an empty array if the input is null", () => {
        const result = emptyOrRows(null);
        expect(result).toEqual([]);
    });

    it("should return an empty array if the input is undefined", () => {
        const result = emptyOrRows(undefined);
        expect(result).toEqual([]);
    });

    it("should return the input array if it is empty", () => {
        const inputArray = [];
        const result = emptyOrRows(inputArray);
        expect(result).toEqual(inputArray);
    });

    it("should return the same array instance if input is valid", () => {
        const inputArray = [1, 2, 3];
        const result = emptyOrRows(inputArray);
        expect(result).toBe(inputArray);
    });
});

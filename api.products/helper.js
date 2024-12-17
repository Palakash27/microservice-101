/**
 * Ensures that the input array is not null or undefined
 * If the input array is null or undefined, it returns an empty array
 *
 * @param {Array} rows - Input Array to check if it is empty
 * @returns {Array} - Returns empty array if input is null or undefined, otherwise returns the input array
 */

const emptyOrRows = (rows) => {
    if (!rows) {
        return [];
    }
    return rows;
};

module.exports = {
    emptyOrRows,
};

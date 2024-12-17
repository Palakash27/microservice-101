const db = require("./db");
const helper = require("../helper");

/**
 * Fetches all active products from the database.
 *
 * @returns {Promise<Object>} - An object containing the data array and message.
 */
const fetchActiveProducts = async () => {
    let data = [];
    let message = "";

    try {
        const rows = await db.query(
            `SELECT * FROM Product WHERE ProductStatus = ?`,
            ["active"]
        );
        data = helper.emptyOrRows(rows);
    } catch (err) {
        message = "Error fetching active products";
    }

    return {
        data,
        message,
    };
};

/**
 * Fetches all products from the database.
 *
 * @returns {Promise<Object>} - An object containing the data array and message.
 */

const fetchAllProducts = async () => {
    let data = [];
    let message = "";

    try {
        const rows = await db.query(`SELECT * FROM Product`);
        data = helper.emptyOrRows(rows);
    } catch (err) {
        message = "Error fetching all products";
    }

    return {
        data,
        message,
    };
};

module.exports = {
    fetchActiveProducts,
    fetchAllProducts,
};

const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "marz",
    connectionLimit: 5,
});

/**
 * Executes a SQL query using the MariaDB connection pool.
 *
 * @param {string} sql - The SQL query to execute.
 * @param {Array} [params] - Optional parameters for the SQL query.
 * @returns {Promise<Array>} - The results of the query.
 */
const query = async (sql, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const results = await connection.query(sql, params);
        return results;
    } catch (err) {
        console.error("Database query error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    query,
};

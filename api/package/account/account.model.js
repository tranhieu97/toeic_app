const conn = require('../../database/connect');

const getAllAccounts = async () => {
    const sql = `SELECT * FROM account INNER JOIN role ON account.role_id = role.role_id`;
    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { getAllAccounts }

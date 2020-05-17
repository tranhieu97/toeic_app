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

const getAccountByUsername = async (username) => {
    const sql = `SELECT username, password, role_id FROM account WHERE username = ${username}`;
    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const insertAccount = async (acc) => {
    const sql = `INSERT INTO account (username, password, full_name, email, role_id) VALUES ("${acc.username}", "${acc.password}, "${acc.full_name}","${acc.email}", ${acc.role_id})`;
    try {
        let result = await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

const deleteAccount = async (acc_id) => {
    const sql = `DELETE FROM account WHERE account_id = ${acc_id}`
    try {
        let result = await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

const updateAccount = async (acc_id, acc_update) => {
    const sql = `UPDATE account SET username = "${acc_update.username}", password = "${acc_update.password}", full_name = "${acc_update.full_name}", email = "${acc_update.email}" WHERE account_id = ${acc_id}`;
    try {
        let result = await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

const updateAccountRole = async (acc_id, acc_role) => {
    const sql = `UPDATE account SET role_id = ${acc_role} WHERE account_id = ${acc_id}`;
    try {
        let result = await conn.query(sql);
    } catch (err) {
        throw err;
    }    
}

module.exports = { getAllAccounts, getAccountByUsername, insertAccount, deleteAccount, updateAccount, updateAccountRole }

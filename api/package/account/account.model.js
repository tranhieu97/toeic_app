const conn = require('../../database/connect');

const getAllAccounts = async () => {
    const sql = `SELECT * FROM account INNER JOIN role ON account.role_id = role.role_id`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const getAccountByEmail = async (email) => {

    const sql = `SELECT * FROM account  WHERE email = "${email}"`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const getAccountById = async (accountId) => {
    const sql = `SELECT * FROM account  WHERE account_id = ${accountId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const getAccountByUsername = async (username) => {
    const sql = `SELECT * FROM account  INNER JOIN role ON account.role_id = role.role_id WHERE account.username = "${username}"`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const insertAccount = async (acc) => {
    const sql = `
    INSERT INTO account (username, password, full_name, email, role_id, status)
    VALUES ("${acc.username}", "${acc.password}", "${acc.fullName}", "${acc.email}", ${acc.roleId}, "active");
    `;
    console.log(sql);

    try {
        await conn.query(sql);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


const deleteAccount = async (accountId) => {
    const sql = `DELETE FROM account WHERE account_id = ${accountId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const updateAccount = async (accountId, updateAccount) => {
    const sql = `
    UPDATE account SET
    username = "${updateAccount.username}",
    password = "${updateAccount.password}",
    full_name = "${updateAccount.fullName}",
    email = "${updateAccount.email}"
    WHERE account_id = ${accountId}
    `;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        console.log(result);
        return true;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const updateAccountRole = async (accountId, accountRoleId) => {
    const sql = `UPDATE account SET role_id = ${accountRoleId} WHERE account_id = ${accountId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const updateLock = async (accountId, status) => {
    const sql = `UPDATE account SET status = "${status}" WHERE account_id = ${accountId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const buildQuery = (listConditions) => {
    const newList = listConditions.map(condition => {
        return `${condition.field} = "${condition.expect}"`
    });
    const query = newList.join(' and ');
    return query;
}


module.exports = {
    getAllAccounts,
    getAccountByUsername,
    insertAccount,
    deleteAccount,
    updateAccount,
    updateAccountRole,
    getAccountByEmail,
    getAccountById,
    updateLock,
    buildQuery
}

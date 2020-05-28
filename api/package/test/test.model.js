const conn = require('../../database/connect');

const getAllTests = async () => {
    const sql = `SELECT * FROM test`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
}

const getTestByName = async (testName) => {

    const sql = `SELECT * FROM test WHERE name = "${testName}"`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getTestById = async (testId) => {
    const sql = `SELECT * FROM test WHERE test_id = ${testId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getTestByPartId = async (partId) => {
    const sql = `SELECT * FROM test WHERE part_id = ${partId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const insertTest = async (test) => {
    const sql = `INSERT INTO test (name, part_id) VALUES ("${test.testName}", ${test.partId})`;
    console.log(sql);

    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const deleteTest = async (testId) => {
    const sql = `DELETE FROM test WHERE test_id = ${testId}`;
    console.log(sql);

    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const updateTest = async (testId, updateTest) => {
    const sql = `UPDATE test SET name = "${updateTest.testName}", part_id = ${updateTest.partId} WHERE test_id = ${testId}`;
    console.log(sql);

    try {
        await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllTests,
    getTestByName,
    getTestById,
    getTestByPartId,
    insertTest,
    deleteTest,
    updateTest
}

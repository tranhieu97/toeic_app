import conn from '../../database/connect'
import { buildQuery, buildUpdateQuery } from '../../helper/buildQuery'
import joi, { number } from 'joi'

const createTestSchema = joi.object().keys({
    partId: joi.number().required(),
    testName: joi.string().max(50).required()
})

const updateTestSchema = joi.object().keys({
    partId: joi.number(),
    testName: joi.string().max(50)
})

const testSchema = {
    createTestSchema,
    updateTestSchema,
}

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

const getManyTests = async (conditions) => {

    const nativeQuery = buildQuery(conditions)
    const sql = `SELECT * FROM test  ${nativeQuery}`;
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
        const result = await conn.query(sql);
        const insertId = result.insertId

        if (!insertId) {
            throw {
                code: 400,
                name: 'QueryError'
            }
        }

        return insertId
    } catch (err) {
        throw err;
    }
}

const deleteTest = async (testId) => {
    const sql = `DELETE FROM test WHERE test_id = ${testId}`;
    console.log(sql);

    try {
        await conn.query(sql);
        return true
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const updateTest = async (testId, updateTest) => {
    const updateString = buildUpdateQuery(updateTest, mapColumnNames)
    const sql = `UPDATE test SET ${updateString} WHERE test_id = ${testId}`;
    console.log(sql);

    try {
        await conn.query(sql);
        return true
    } catch (err) {
        throw err;
    }
}

const mapColumnNames = {
    testId: 'test_id',
    testName: 'name',
    partId: 'part_id'
}
export default {
    getAllTests,
    getTestByName,
    getTestById,
    getTestByPartId,
    insertTest,
    deleteTest,
    updateTest,
    getManyTests,
    testSchema,
}

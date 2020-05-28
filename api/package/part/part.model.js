const conn = require('../../database/connect');

const getAllParts = async () => {
    const sql = `SELECT part_id AS partID, name AS partName, total_time as totalTime FROM part`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getPartByName = async (partName) => {
    const sql = `SELECT part_id AS partID, name AS partName, total_time as totalTime FROM part WHERE  name = "${partName}"`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getPartById = async (partId) => {
    const sql = `SELECT part_id AS partID, name AS partName, total_time as totalTime FROM part WHERE  part_id = ${partId}`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const insertPart = async (part) => {
    const sql = `INSERT INTO part (name, total_time) VALUES ("${part.partName}", ${part.totalTime})`;
    console.log(sql);
    
    try {
        await conn.query(sql);
        const result = await conn.query('SELECT part_id AS partID, name AS partName, total_time as totalTime FROM part WHERE  part_id = LAST_INSERT_ID()');
        return result[0];

    } catch (err) {
        console.log(err);
        return null;
    }
}

const deletePart = async (partId) => {
    const sql = `DELETE FROM part WHERE part_id = ${partId}`;
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

const updatePart = async (partId, updatePart) => {
    const sql = `UPDATE part SET name = "${updatePart.partName}", total_time = ${updatePart.totalTime} WHERE part_id = ${partId}`;
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

module.exports = { 
    getAllParts,
    getPartById,
    getPartByName,
    updatePart,
    deletePart,
    insertPart,
}

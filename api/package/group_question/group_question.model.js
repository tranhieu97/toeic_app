const conn = require('../../database/connect');

const getAllGroupQuestions = async () => {
    const sql = `SELECT * FROM group_question`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
}

const getGroupQuestionById = async (groupQuestionId) => {
    const sql = `SELECT * FROM group_question WHERE group_question_id = ${groupQuestionId}`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getGroupQuestionByTestId = async (testId) => {
    const sql = `SELECT * FROM group_question WHERE test_id = ${testId}`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const insertGroupQuestion = async (groupQuestion) => {
    const sql = `
    INSERT INTO group_question (text, image_path, audio_path, test_id)
    VALUES ("${groupQuestion.text}", "${groupQuestion.imagePath}", "${groupQuestion.audioPath}", ${groupQuestion.testId})
    `;
    console.log(sql);
    
    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const deleteGroupQuestion = async (groupQuestionId) => {
    const sql = `DELETE FROM group_question WHERE group_question_id = ${groupQuestionId}`;
    console.log(sql);
    
    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const updateGroupQuestion = async (groupQuestionId, updateGroupQuestion) => {
    const sql = `
    UPDATE group_question SET
    text = "${updateGroupQuestion.text}",
    image_path = "${updateGroupQuestion.imagePath}",
    audio_path = "${updateGroupQuestion.audioPath}",
    test_id = ${updateGroupQuestion.testId}
    WHERE group_question_id = ${groupQuestionId}
    `;
    console.log(sql);
    
    try {
        await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllGroupQuestions,
    getGroupQuestionById,
    getGroupQuestionByTestId,
    insertGroupQuestion,
    deleteGroupQuestion,
    updateGroupQuestion
}

const conn = require('../../database/connect');

const getAllQuestions = async () => {
    const sql = `SELECT * FROM question`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
}

const getQuestionById = async (questionId) => {
    const sql = `SELECT * FROM question WHERE question_id = ${questionId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getQuestionByGroupQuestionId = async (groupQuestionId) => {
    const sql = `SELECT * FROM question WHERE group_question_id = ${groupQuestionId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const insertQuestion = async (question) => {
    const sql = `
    INSERT INTO question (group_question_id, text, image_path, audio_path, explanation)
    VALUES (${question.groupQuestionId}, "${question.text}", "${question.imagePath}", "${question.audioPath}", "${question.explanation}")
    `;
    console.log(sql);

    try {
        const result = await conn.query(sql);
        return result.insertId;
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}


const deleteQuestion = async (questionId) => {
    const sql = `DELETE FROM question WHERE question_id = ${questionId}`;
    console.log(sql);

    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const updateQuestion = async (questionId, updateQuestion) => {
    const sql = `
    UPDATE question SET
    group_question_id = ${updateQuestion.groupQuestionId},
    text = "${updateQuestion.text}",
    image_path = "${updateQuestion.imagePath}",
    audio_path = "${updateQuestion.audioPath}",
    explanation = "${updateQuestion.explanation}"
    WHERE question_id = ${questionId}
    `;
    console.log(sql);

    try {
        await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    getQuestionByGroupQuestionId,
    insertQuestion,
    deleteQuestion,
    updateQuestion
}

const conn = require('../../database/connect');

const getAllAnswers = async () => {
    const sql = `SELECT * FROM answer`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
}

const getAnswerById = async (answerId) => {
    const sql = `SELECT * FROM answer WHERE answer_id = ${answerId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getAnswerByQuestionId = async (questionId) => {
    const sql = `SELECT * FROM answer WHERE question_id = ${questionId}`;
    console.log(sql);

    try {
        let result = await conn.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

const insertAnswer = async (answer) => {
    const sql = `
    INSERT INTO answer (question_id, text, is_right, explanation)
    VALUES (${answer.questionId}, "${answer.text}", ${answer.isRight}, "${answer.explanation}")
    `;
    console.log(sql);

    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const deleteAnswer = async (answerId) => {
    const sql = `DELETE FROM answer WHERE answer_id = ${answerId}`;
    console.log(sql);

    try {
        await conn.query(sql);
        //console.log('affectedRows: ' + result.affectedRows);
    } catch (err) {
        throw err;
    }
}

const updateAnswer = async (answerId, updateAnswer) => {
    const sql = `
    UPDATE answer SET
    question_id = ${updateAnswer.questionId},
    text = "${updateAnswer.text}",
    is_right = ${updateAnswer.isRight},
    explanation = "${updateAnswer.explanation}"
    WHERE answer_id = ${answerId}
    `;
    console.log(sql);

    try {
        await conn.query(sql);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllAnswers,
    getAnswerById,
    getAnswerByQuestionId,
    insertAnswer,
    deleteAnswer,
    updateAnswer
}

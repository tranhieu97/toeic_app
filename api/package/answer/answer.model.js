import conn from '../../database/connect'
import { buildInsertManyQuery } from '../../helper/buildQuery'
import joi from 'joi'

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

const insertManyAnswers = async (answers) => {
    const queryInsertMany = buildInsertManyQuery(answers)
    const sql = `INSERT INTO answer (question_id, text, is_right, explanation)
    VALUES ${queryInsertMany}`

    console.log(sql);

    try {
        const result = await conn.query(sql);
        return result
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
        return true
    } catch (err) {
        throw err;
    }
}

const deleteManyAnswers = async questionId => {
    const sql = `DELETE FROM answer WHERE question_id = ${questionId} `
    console.log(sql)

    try {
        await conn.query(sql)

        return true
    } catch (error) {
        throw error
    }
}

const mapColumnTableAnswers = {
    questionId: 'question_id',
    text: 'text', 
    isRight: 'is_right',
    explanation: 'explanation'
}


const createAnswerSchema = joi.object().keys({
    questionId: joi.number().required(),
    text: joi.string().required(),
    isRight: joi.boolean().required(),
    explanation: joi.string()
})

const updateAnswerSchema = joi.object().keys({
    questionId: joi.number(),
    text: joi.string(),
    isRight: joi.boolean(),
    explanation: joi.string()
})

const answerSchema = {
    createAnswerSchema,
    updateAnswerSchema,
}
export default {
    getAllAnswers,
    getAnswerById,
    getAnswerByQuestionId,
    insertAnswer,
    deleteAnswer,
    updateAnswer,
    insertManyAnswers,
    deleteManyAnswers,
    mapColumnTableAnswers,
    answerSchema,
}

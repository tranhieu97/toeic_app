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
    const sql = `SELECT q.question_id as questionId, q.group_question_id as groupQuestionId, q.text as text, q.audio_path as audioPath, q.image_path as imagePath, 
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT('text', a.text, 'isRight', a.is_right, 'explanation', a.explanation)),"]") as answers 
    FROM question  as q 
    LEFT JOIN answer as a ON q.question_id = a.question_id
    WHERE q.question_id = ${questionId}
    GROUP BY q.question_id`;
    console.log(sql);

    try {
        let result = await conn.query(sql);

        if(!result || !result[0]) {
            throw {
                code: 404,
                name: 'QuestionNotFound'
            }
        }

        result[0].answers = JSON.parse(result[0].answers)
        return result[0];
    } catch (err) {
        throw err;
    }
}

const getQuestionByGroupQuestionId = async (groupQuestionId) => {
    const sql = `SELECT q.question_id as questionId, q.group_question_id as groupQuestionId, q.text as text, q.audio_path as audioPath, q.image_path as imagePath, 
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT('text', a.text, 'isRight', a.is_right, 'explanation', a.explanation)),"]") as answers 
    FROM question  as q 
    LEFT JOIN answer as a ON q.question_id = a.question_id
    WHERE q.group_question_id = ${groupQuestionId}
    GROUP BY q.question_id`;
    console.log(sql);

    try {
        let result = await conn.query(sql);

        if(!result || !result[0]) {
            throw {
                code: 404,
                name: 'QuestionsNotFound'
            }
        }

        result = result.map( each => {
            each.answers = JSON.parse(each.answers)
            return each
        })

        return result;
    } catch (error) {
        throw error;
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

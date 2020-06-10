const conn = require('../../database/connect');
import questionModel from '../question/question.model'
import { buildQuery } from '../../helper/buildQuery';
import answerModel from '../answer/answer.model';


const mapNameColumn = {
    groupQuestionId: 'group_question_id',
    text: 'text',
    imagePath: 'image_path',
    audioPath: 'audio_path',
    testId: 'test_id',
}

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

const getManyGroupQuestion = async (query) => {
    try {
        const queryStr = buildQuery(query, mapNameColumn)
        const sql = `SELECT * FROM group_question ${queryStr}`

        console.log(sql)

        const groupQuestions = await conn.query(sql)
        
        if(groupQuestions && groupQuestions.length > 0) {
            let result = []
            for(const item of groupQuestions) {
                item.questions = await questionModel.getQuestionByGroupQuestionId(item[mapNameColumn.groupQuestionId])
                result.push(item)
            }

            return result
        }

        throw {
            code: 404,
            name: 'GroupQuestionNotFound'
        }

    } catch (error) {
        throw error
    }
}

const getGroupQuestionById = async (groupQuestionId) => {
    const sql = `SELECT * FROM group_question WHERE group_question_id = ${groupQuestionId}`;
    console.log(sql);
    
    try {
        let result = await conn.query(sql);

        const questions = await questionModel.getQuestionByGroupQuestionId(groupQuestionId)
        result[0].questions = questions

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
        const result = await conn.query(sql);
        return result.insertId;
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

        if (!updateGroupQuestion.questions || Array.isArray(updateGroupQuestion.questions)) {
            return true
        }

        for ( const question of questions ) {

            const { questionId, answers, ...updateQuestionData} = question
            await questionModel.updateQuestion(questionId, updateQuestionData )

            if(!answers || !Array.isArray(answers)) {
                return true
            }

            for (const answer of answers) {
                const { answerId, updateAnswer} = answer
                await answerModel.updateAnswer(answerId, updateAnswer)
            }
        }

        return true
    } catch (err) {
        throw err;
    }
}

const  testGetGroupQuestion = async () => {
    try {
        
        const sql = `SELECT  gq.group_question_id, gq.text, gq.audio_path, gq.image_path, JSON_OBJECT('question_id',q.question_id, 'text',  q.text) AS questions FROM group_question As gq
        LEFT JOIN question As q ON gq.group_question_id = q.group_question_id GROUP BY gq.group_question_id`

        const result = await conn.query(sql)
    } catch (error) {
        console.log(error)
    }
}


export default {
    getGroupQuestionById,
    getGroupQuestionByTestId,
    insertGroupQuestion,
    deleteGroupQuestion,
    updateGroupQuestion,
    testGetGroupQuestion,
    getManyGroupQuestion,
}

import gqModel from './group_question.model';
import groupQuestionService from './group_question.service'
import fs from 'fs'

const getListGroupQuestions = async (req, res) => {
    try {

        const query = req.query
        const groupQuestions = await gqModel.getManyGroupQuestion(query);

        return res.status(200).json({
            isSuccess: true,
            message: 'get list group question successfully',
            totalCount: groupQuestions.length,
            data: groupQuestions
        });

    } catch (error) {
        return res.status(401).json(error);
    }
}

const getGroupQuestion = async (req, res) => {
    try {
        const { groupQuestionId } = req.params;
        const groupQuestion = await gqModel.getGroupQuestionById(groupQuestionId);

        return res.status(200).json({
            isSuccess: true,
            message: 'get group question successfully',
            data: groupQuestion
        });

    } catch (error) {
        return res.status(401).json(error);
    }
}

const createGroupQuestion = async (req, res) => {
    try {
        const { text, testId, questions } = req.body;

        const newGroupQuestion = {
            text,
            testId,
            imagePath: req.imagePath,
            audioPath: req.audioPath,
            questions: JSON.parse(questions)
        }

        const insertId = await groupQuestionService.createOneGroupQuestion(newGroupQuestion)

        return res.status(200).json({
            isSuccess: true,
            message: 'insert group question successfully',
            insertId: insertId
        })
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateGroupQuestion = async (req, res) => {
    try {
        const { groupQuestionId } = req.params;
        const { text, testId, oldImagePath, oldAudioPath, questions } = req.body

        const { imagePath, audioPath, filePath } = req

        if( oldImagePath && imagePath && filePath ) {
            await fs.unlink(`${filePath}+${oldImagePath}`)
        }

        if( oldAudioPath && audioPath && filePath ) {
            await fs.unlink(`${filePath}+${oldAudioPath}`)
        }

        const groupQuestionData = {
            text,
            testId,
            imagePath,
            audioPath,
            questions,
        }

        await gqModel.updateGroupQuestion(groupQuestionId, groupQuestionData)

        return res.status(201).json({
            isSuccess: true,
            message: 'update group question successfully'
        });

    } catch (error) {
        return res.status(400).json(error);
    }
}

const deleteGroupQuestion = async (req, res) => {
    try {
        const { groupQuestionId } = req.params;
        await gqModel.deleteGroupQuestion(groupQuestionId);
        return res.status(200).json({
            isSuccess: true,
            message: 'delete group question successfully'
        });

    } catch (err) {
        res.status(400).json(err);
    }
}

export default {
    getListGroupQuestions,
    getGroupQuestion,
    createGroupQuestion,
    updateGroupQuestion,
    deleteGroupQuestion
}
import questionModel from './question.model';

const getListQuestions = async (req, res) => {
    try {
        const questions = await questionModel.getAllQuestions();

        return res.status(200).json({
            isSuccess: true,
            message: 'get list questions successfully',
            totalCount: questions.length,
            data: questions
        });

    } catch (error) {
        return res.status(404).json(error);
    }
}

const getQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const question = await questionModel.getQuestionById(questionId);

        return res.status(200).json({
            isSuccess: true,
            message: 'get question successfully',
            data: question
        });

    } catch (error) {

        console.log(error)
        return res.status(404).json({
            code: error.code,
            name: error.name,
        });
    }
}

const createQuestion = async (req, res) => {
    try {
        const { groupQuestionId, text, imagePath, audioPath, explanation } = req.body;
        //validate

        const insertId = await questionModel.insertQuestion({
            groupQuestionId,
            text,
            imagePath,
            audioPath,
            explanation
        });

        return res.status(200).json({
            isSuccess: true,
            message: 'insert question successfully',
            insertId: insertId
        });
    } catch (error) {
        return res.status(404).json(error);
    }
}

const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { groupQuestionId, text, imagePath, audioPath, explanation } = req.body;

        //validate

        await questionModel.updateQuestion(questionId, {
            groupQuestionId,
            text,
            imagePath,
            audioPath,
            explanation
        });

        return res.status(200).json({
            isSuccess: true,
            message: 'update question successfully'
        });

    } catch (error) {
        return res.status(404).json({
            code: error.code,
            name: error.name,
        });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        await questionModel.deleteQuestion(questionId);
        return res.status(200).json({
            isSuccess: true,
            message: 'delete question successfully'
        });

    } catch (err) {
        res.status(404).json(err);
    }
}

export default {
    getListQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
}

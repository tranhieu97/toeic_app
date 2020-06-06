import gqModel from './group_question.model';

const getListGroupQuestions = async (req, res) => {
    try {

        const query = req.query
        console.log(query)
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

const insertGroupQuestion = async (req, res) => {
    try {
        const { text, imagePath, audioPath, testId } = req.body;
        //validate

        const insertId = await gqModel.insertGroupQuestion({
            text,
            imagePath,
            audioPath,
            testId
        });

        return res.status(200).json({
            isSuccess: true,
            message: 'insert group question successfully',
            insertId: insertId
        });
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateGroupQuestion = async (req, res) => {
    try {
        const { groupQuestionId } = req.params;
        const { text, imagePath, audioPath, testId } = req.body;

        //validate

        await gqModel.updateGroupQuestion(groupQuestionId, {
            text,
            imagePath,
            audioPath,
            testId
        });

        return res.status(200).json({
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
    insertGroupQuestion,
    updateGroupQuestion,
    deleteGroupQuestion
}
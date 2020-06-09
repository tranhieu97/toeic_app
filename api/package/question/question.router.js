import { Router } from 'express'
import questionController from './question.controller'
import CheckIsManager from '../../middlewares/checkIsManager'
import Authenticate from '../../middlewares/authenticate'

const router = Router();

router.get('/question/get-list', questionController.getListQuestions);
router.get('/question/:questionId', questionController.getQuestion);
router.post('/question/create', questionController.createQuestion);
router.put('/question/update/:questionId', questionController.updateQuestion);
router.delete('/question/delete/:questionId', questionController.deleteQuestion);

export default router

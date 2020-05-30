import { Router } from 'express'
import gqController from './group_question.controller'
import CheckIsManager from '../../middlewares/checkIsManager'
import Authenticate from '../../middlewares/authenticate'

const router = Router();

router.get('/group-question/get-list', gqController.getListGroupQuestions);
router.get('/group-question/:groupQuestionId', gqController.getGroupQuestion);
router.post('/group-question/create', gqController.insertGroupQuestion);
router.put('/group-question/update/:groupQuestionId', gqController.updateGroupQuestion);
router.delete('/group-question/delete/:groupQuestionId');
// router.put('/part/update/:partID', CheckIsManager, PartController.updatePart)
// router.delete('/part/delete/:partID', CheckIsManager, PartController.deletePart)

export default router

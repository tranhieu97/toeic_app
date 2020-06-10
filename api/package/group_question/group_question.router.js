import { Router } from 'express'
import gqController from './group_question.controller'
import CheckIsManager from '../../middlewares/checkIsManager'
import Authenticate from '../../middlewares/authenticate'
import upload from '../../helper/multer'
import authenticate from '../../middlewares/authenticate'

const router = Router();

router.get('/group-question/get-list', authenticate, gqController.getListGroupQuestions);
router.get('/group-question/:groupQuestionId', authenticate, gqController.getGroupQuestion);

router.post('/group-question/create', CheckIsManager, 
  upload.fields([{name: 'imagePath', maxCount: 1}, { name: 'audioPath', maxCount: 1 }]), 
  gqController.createGroupQuestion
)

router.put('/group-question/update/:groupQuestionId', CheckIsManager,
  upload.fields([{name: 'imagePath', maxCount: 1}, { name: 'audioPath', maxCount: 1 }]),
  gqController.updateGroupQuestion);
router.delete('/group-question/delete/:groupQuestionId');

// router.put('/part/update/:partID', CheckIsManager, PartController.updatePart)
// router.delete('/part/delete/:partID', CheckIsManager, PartController.deletePart)

export default router

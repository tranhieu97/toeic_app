import { Router } from 'express'
import gqController from './group_question.controller'
import CheckIsManager from '../../middlewares/checkIsManager'
import Authenticate from '../../middlewares/authenticate'
import upload from '../../helper/multer'

const router = Router();

router.get('/group-question/get-list', gqController.getListGroupQuestions);
router.get('/group-question/:groupQuestionId', gqController.getGroupQuestion);
<<<<<<< HEAD

router.post('/group-question/create', 
  upload.fields([{name: 'imagePath', maxCount: 1}, { name: 'audioPath', maxCount: 1 }]), 
  gqController.createGroupQuestion
)
=======
router.post('/group-question/create', upload.fields([
    {name: 'imagePath', maxCount: 1},
    {name: 'audioPath', maxCount: 1},
]), gqController.insertGroupQuestion);
>>>>>>> 178872655b38c357f5ddb86307239d945bdeb1b5

router.put('/group-question/update/:groupQuestionId', gqController.updateGroupQuestion);
router.delete('/group-question/delete/:groupQuestionId');
// router.put('/part/update/:partID', CheckIsManager, PartController.updatePart)
// router.delete('/part/delete/:partID', CheckIsManager, PartController.deletePart)

export default router

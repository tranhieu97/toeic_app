import { Router } from 'express'
import TestController from './test.controller'
import authenticate from '../../middlewares/authenticate'
import checkIsAdmin from '../../middlewares/checkIsAdmin'
import checkIsManager from '../../middlewares/checkIsManager'

const router = Router()

router.get('/tests', authenticate, TestController.getListTest)
router.get('/tests/getTest/:testId', authenticate, TestController.getTest)

router.put('/tests/:testId', authenticate, TestController.update)
router.get('/tests/detail/', TestController.getDetail)

router.post('/tests/create', checkIsManager, TestController.createTest )

export default router
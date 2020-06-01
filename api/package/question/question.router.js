import { Router } from 'express'
import questionController from './question.controller'
const router = Router()

router.post('/question/create', questionController.createQuestion)

export default router
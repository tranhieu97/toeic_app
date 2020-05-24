import { Router } from 'express'
import PartController from './part.controller'
import CheckIsManager from '../../middlewares/checkIsManager'
import Authenticate from '../../middlewares/authenticate'

const router = Router()

router.get('/part/get-list', Authenticate, PartController.getListPart)
router.get('/part/:partID', Authenticate, PartController.getPart)

router.post('/part/create', CheckIsManager, PartController.createPart)

router.put('/part/update/:partID', CheckIsManager, PartController.updatePart)
router.delete('/part/delete/:partID', CheckIsManager, PartController.deletePart)

export default router

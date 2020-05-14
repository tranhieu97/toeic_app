import { Router } from 'express'
import AccountController from './account.controller'
import checkIsAdmin from '../../middlewares/checkIsAdmin'
const router = Router()

router.post('/auth/login', AccountController.signIn)
router.post('/auth/sign-up', AccountController.signUp)

router.get('/admin/get-accounts',checkIsAdmin, AccountController.getListAccounts)


export default router
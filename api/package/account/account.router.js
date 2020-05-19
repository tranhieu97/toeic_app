import { Router } from 'express'
import AccountController from './account.controller'
import checkIsAdmin from '../../middlewares/checkIsAdmin'
const router = Router()

router.post('/auth/login', AccountController.signIn)
router.post('/auth/sign-up', AccountController.signUp)

router.get('/admin/account/get-list',checkIsAdmin, AccountController.getListAccounts)
router.get('/admin/account/:accountID', checkIsAdmin, AccountController.getAccount)
router.post('/admin/account/create', checkIsAdmin, AccountController.createAccount)
router.put('/admin/account/update/:accountID', checkIsAdmin, AccountController.updateAccount)
router.delete('/admin/account/delete/:accountID', checkIsAdmin, AccountController.deleteAccount)
router.put('/admin/account/changeLock/:accountID', checkIsAdmin, AccountController.changeLockAccount)

export default router
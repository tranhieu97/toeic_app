import { Router } from 'express'
import AccountController from './account.controller'
import checkIsAdmin from '../../middlewares/checkIsAdmin'
const router = Router()

router.post('/auth/login', AccountController.signIn)
router.post('/auth/sign-up', AccountController.signUp)

<<<<<<< HEAD
router.get('/admin/get-accounts',checkIsAdmin, AccountController.getListAccounts)
router.get('/admin/account/:accountID', checkIsAdmin, AccountController.getAccount)
=======
router.get('/admin/get-accounts', AccountController.getListAccounts)

>>>>>>> 99d0318b669b1951c4863a9aeea2975961ef6e5b

export default router
import { Router } from 'express'
import account  from './api/package/account/account.router'
import part from './api/package/part/part.router'
import test from './api/package/test/test.router'
<<<<<<< HEAD
=======
import groupQuestion from './api/package/group_question/group_question.router'
>>>>>>> 6b7e0395a369f6b7026259722a78ef41487f4350
import question from './api/package/question/question.router'

export default () => {
  const router = Router()

<<<<<<< HEAD
  router.use([account, part, test, question])
=======
  router.use([account, part, test, groupQuestion, question])
>>>>>>> 6b7e0395a369f6b7026259722a78ef41487f4350
  
  return router
}

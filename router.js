import { Router } from 'express'
import account  from './api/package/account/account.router'
import part from './api/package/part/part.router'
import test from './api/package/test/test.router'
import groupQuestion from './api/package/group_question/group_question.router'
import question from './api/package/question/question.router'

export default () => {
  const router = Router()

  router.use([account, part, test, groupQuestion, question])
  
  return router
}

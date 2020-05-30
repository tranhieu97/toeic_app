import { Router } from 'express'
import account  from './api/package/account/account.router'
import part from './api/package/part/part.router'
import test from './api/package/test/test.router'

export default () => {
  const router = Router()

  router.use([account, part, test])
  
  return router
}

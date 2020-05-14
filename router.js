import { Router } from 'express'
import account  from './api/package/account/account.router'

export default () => {
  const router = Router()

  router.use(account)

  return router
}

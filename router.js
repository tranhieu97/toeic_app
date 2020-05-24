import { Router } from 'express'
import account  from './api/package/account/account.router'
import part from './api/package/part/part.router'

export default () => {
  const router = Router()

  router.use([account, part])
  
  return router
}

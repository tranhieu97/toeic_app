import accountModel from '../package/account/account.model'
import config  from '../config'

const createAdminAccount = async () => {
  try {
    const adminAccount = config.admin

    const existAdmin = await accountModel.getAccountByEmail(adminAccount.email)

    if (!existAdmin|| existAdmin === undefined) {
      await accountModel.insertAccount(adminAccount)
    } 

    return

  } catch (error) {
    
  }
}

export default createAdminAccount
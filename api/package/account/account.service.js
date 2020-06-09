import accountModel from './account.model'


const findOne = async ({query, cridentials}) => {
  return new Promise( ( resolve, reject ) => {
    const account = accountModel.getAccountById(query.accountID) 

    if (account) {
      delete account.password

      return resolve(account)
    }

    const error = {
      code: 404,
      name: 'AccountNotFound'
    }

    return reject(error)
  })
}

const createOne = async ({ cridentials, dataCreate}) => {

  return new Promise ( async (resolve, reject ) => {

    const account = await accountModel.getAccountByEmail(dataCreate.email)

    if (account) {
      return reject({
        code: 400,
        name: 'DuplicateAccount'
      })
    }
    const newAccount = await accountModel.insertAccount(dataCreate) 
    let isCreated = false
    if (newAccount) {
      isCreated = true
    }
  
    if (isCreated) {
      return resolve(true)
    }

    const error = {
      code: 400,
      name: 'QueryError'
    }

    reject(error)
  })
}

const findManyAccount = async ({query, cridentials}) => {
  const accounts = await accountModel.getAllAccounts()

  return new Promise ( (resolve, reject) => {
    if (accounts && accounts.length) {
      resolve(accounts)
    }

    const error = {
      code: 404,
      name: 'AccountNotFound'
    }
    
    reject(error)


  })
}

const updateOne = async (account, accountID) => {
  return new Promise( async (resolve, reject) => {
    const findAccount = await accountModel.getAccountById(accountID)

    if (!findAccount) {
      const error = {
        code: 404,
        name: 'AccountNotFound'
      }
      reject(error)
    }

    const isUpdate = await accountModel.updateAccount(accountID, account) 

    if (isUpdate) {
      resolve(true)
    }

    const notfounderror = {
      code: 404,
      name: 'AccountNotFound'
    }
    reject(notfounderror)
  })
}

const deleteOne = async (accountID) => {
  return new Promise ( async (resolve, reject ) => {
    const findAccount = await accountModel.getAccountById(accountID)

    if(!findAccount) {
      let error = {
        code: 404,
        name: 'AccountNotFound'
      }

      reject(error)
    }

    await accountModel.deleteAccount(accountID)

    resolve(true)

  })
}

const changeLock = async (accountID) => {
  return new Promise ( async (resolve, reject) => {
    const account = await accountModel.getAccountById(accountID) 

    if(!account) {
      let error = {
        code: 404,
        name: 'AccountNotFound'
      }
  
      reject(error)
      
    }

    const status =(account.status === 'active')? 'lock': 'active'
    await accountModel.updateLock(accountID, status)

    resolve(true)
    
  })
}

export default {
  findOne,
  createOne,
  findManyAccount,
  updateOne,
  deleteOne,
  changeLock

}
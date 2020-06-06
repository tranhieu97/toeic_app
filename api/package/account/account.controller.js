import jwt from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import accountsModel from './account.model'
import accountService from './account.service'

async function signIn (req, res) {
  try {
    const { username, password } = req.body

    if (username == undefined || password == undefined) {
      return res.status(400).json({
        isSuccess: false,
        message: 'username or password is undefined',
        data: null,
      })
    }

    if (username === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'username must not be blank',
        data: null,
      })
    }

    if (password === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'password must not be blank',
        data: null,
      })
    }

    const account = await accountsModel.getAccountByUsername(username) // finding a user 
  
    if (!account) {
      return res.status(401).json({
        isSuccess: false,
        message: 'invalid username',
        data: null,
      })
    }

    if(account.status === 'lock') {
      return res.status(403).json({
        isSuccess: false,
        message: 'your account is lock',
        data: null,
      })
    }

    const isCorrectPassword = await bcrypt.compare(password, account.password)

    if (!isCorrectPassword) {
      return res.status(401).json({
        isSuccess: false,
        message: 'invalid password',
        data: null,
      })
    }

    delete account.password 

    console.log(account)

    const isAdmin = account.role_name == 'admin'? true: false
    const isManager = account.role_name == 'editor'? true: false
    const payload = {
      userID: account.account_id,
      username: account.username,
      role: account.role_id,
      isAdmin,
      isManager
    }
    const accessToken = await jwt.sign(payload, config.secret, { expiresIn: '7d' })

    return res.status(200).json({
      isSuccess: true,
      message: 'login successfully',
      data: {
        accessToken: accessToken,
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

async function signUp (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body

    if (firstName == undefined || lastName == undefined || email == undefined || password == undefined ) {
      return res.status(400).json({
        isSuccess: false,
        message: 'validate error',
        data: null
      })
    }

    if (firstName === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'firstName must not be blank',
        data: null,
      })
    }

    if (email === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'email must not be blank',
        data: null,
      })
    }

    if (password === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'you must type password',
        data: null,
      })
    }

    const existAccount = (email == mockUser.username)? mockUser : null

    if (existAccount) {
      return res.status(401).json({
        isSuccess: false,
        message: 'email address is already exist',
        data: null
      })
    }
    
    const hashPass = await bcrypt.hash(password, 10)

    // create account
    const newAccount = {
      firstName,
      lastName,
      email,
      password: hashPass
    }

    delete newAccount.password

    return res.status(200).json({
      isSuccess: true,
      message: 'sign-up account successfully',
      data: newAccount
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

async function getListAccounts (req, res) {
  try {
    const query = {
      limit: 10,
      sortBy: 'createdAt',
      cursor: '',
    }

    const credentials = req.user

    //query

    const accounts = await accountService.findManyAccount({query: null, credentials})
    
    return res.status(200).json({data: {list: accounts}})

  } catch (error) {
    return res.status(500).json(error)
  }
}

async function createAccount (req, res) {
  try {
    const { fullName, username, email, password, roleId } = req.body

    const credentials = req.user
    if (fullName == undefined || username == undefined || email == undefined || password == undefined || roleId == undefined ) {
      return res.status(400).json({
        isSuccess: false,
        message: 'validate error',
        data: null
      })
    }

    if (username === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'username must not be blank',
        data: null,
      })
    }


    if (fullName === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'firstName must not be blank',
        data: null,
      })
    }

    if (email === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'email must not be blank',
        data: null,
      })
    }

    if (password === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'you must type password',
        data: null,
      })
    }

    if(roleId === '') {
      return res.status(400).json({
        isSuccess: false,
        message: 'you must choose role for this account',
        data: null,
      })
    }
    
    const hashPass = await bcrypt.hash(password, 10)

    const isValidRole = true
    
    const newAccount = {
      fullName,
      username,
      email,
      password: hashPass,
      roleId,
    }

    console.log(newAccount)

    await accountService.createOne({
      credentials,
      dataCreate: newAccount,
    })

    return res.status(200).json(newAccount)
    
  } catch (error) {
    return res.json(error)
  }
}

async function updateAccount (req, res) {
  try {
    const credentials = req.user
    const { fullName, username, email, password, roleID } = req.body
    const { accountID } = req.params
    const hashPass = await bcrypt.hash(password, 10)
    const updateAccount = {
      fullName,
      username,
      email,
      password: hashPass,
      role: roleID,
    }
    const isUpdate = await accountService.updateOne(updateAccount, accountID) 

    if (!isUpdate) {
      return res.status(401).json({
        isUpdated: false,
        message: 'cannot update account'
      })
    }

    return res.status(200).json({
      isUpdate: true,
      message: 'updated account'
    })
  } catch (error) {
    return res.json(error)
  }
}

async function getAccount (req, res) {
  try {
    const { accountID } = req.params
    const credentials = req.user
    const account = await accountService.findOne({
      query: { accountID: accountID },
      credentials: credentials,
    })

    if(!account) {
      return res.status(404).json({
        code: 404,
        name: 'AccountNotFound'
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: 'get account successfuly',
      data: account
    })

  } catch (error) {

    return res.json(error)

  }
}

async function deleteAccount(req, res) {
  try {
    const { accountID } = req.params

    const isDelete = await accountService.deleteOne(accountID)

    if(isDelete) {
      return res.status(200).json({
        isSuccess: true,
        message: 'deleted account'
      })
    }

    return res.status(404).json({
      isSuccess: true,
      message: 'cannot delete account'
    })

  } catch (error) {
    return res.status(404).json(error)
  }
}

async function changeLockAccount (req, res) {
  try {
    const { accountID } = req.params
    const credentials = req.user

    const isChangeLock = await accountService.changeLock(accountID)

    if (!isChangeLock) {
      return res.status(404).json({
        isChangeLock: false,
        message: 'AccountNotFound'
      })
    }

    return res.status(200).json({
      isChangeLock: true,
      message: 'change lock account successfully'
    })

  } catch (error) {
    return res.json(error)
  }
}
export default {
  signIn,
  signUp,
  getListAccounts,
  getAccount,
  updateAccount,
  createAccount,
  deleteAccount,
  changeLockAccount
}
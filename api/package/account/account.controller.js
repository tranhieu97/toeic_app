import jwt from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import accountsModel from './account.service'
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

    const account = mockUser // finding a user 
    
    if (username !== account.username) {
      return res.status(401).json({
        isSuccess: false,
        message: 'invalid username',
        data: null,
      })
    }

    if (password !== account.password) {
      return res.status(401).json({
        isSuccess: false,
        message: 'invalid password',
        data: null,
      })
    }

    account.password = undefined

    const accessToken = await jwt.sign(account, config.secret, { expiresIn: '7d' })

    return res.status(200).json({
      isSuccess: true,
      message: 'login successfully',
      data: {
        accessToken: accessToken,
      }
    })

  } catch (error) {
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

    //query

    const accounts = {
      list: [],
      cursor: 'idAccount'
    }
    
    return res.status(200).json(accounts)

  } catch (error) {
    return res.status(500).json(error)
  }
}

async function createAccount (req, res) {
  try {
    const { firstName, lastName, email, password, role } = req.body

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

    const existAccount = await accountService.findOne({
      query: { 
        email,
      },
      cridentials: req.user
    })

    if (existAccount) {
      return res.status(401).json({
        isSuccess: false,
        message: 'email address is already exist',
        data: null
      })
    }
    
    const hashPass = await bcrypt.hash(password, 10)

    const isValidRole = true
    // create account
    const newAccount = {
      firstName,
      lastName,
      email,
      password: hashPass,
      role: role,
    }

    return res.status(200).json(newAccount)
    
  } catch (error) {
    return res.json(error)
  }
}

async function updateAccount (req, res) {
  try {
    const credentials = req.user
    const { firstName, lastName, email, password, role } = req.body
    const { accountID } = req.params
    const updateAccount = {
      firstName,
      lastName,
      email,
      password,
      role,
    }
    const isUpdate = await accountsModel.update({
      query: { accountID: accountID },
      credentials,
      updateData: updateAccount,
    }) 

    if (!isUpdate) {
      return res.status(401).json({
        isUpdated: false,
        message: 'cannot update account'
      })
    }

    return res.json(200).json({
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
    const account = await accountsModel.findOne({
      query: { accountID: accountID },
      credentials: credentials,
    })

    if(!account) {
      return res.status(404).json({
        code: 404,
        name: 'AccountNotFound'
      })
    }

    return res.status(200).json(account)

  } catch (error) {

    return res.json(error)

  }
}

async function deleteAccount (req, res) {
  try {
    const { accountID } = req.params

    const credentials = req.user

    const isDelete = await accountsModel.deleteOne({
      query: { accountID: accountID, },
      credentials,
    })

    if (!isDelete) {
      return res.status(404).json({
        isDelete: false,
        message: 'AccountNotFound',
        data: null
      })
    }
    
    return res.status(200).json({
      isDelete: true,
      message: 'deleted account',
    })
  } catch (error) {
    return res.json(error)
  }
}

async function changeLockAccount (req, res) {
  try {
    const { accountID } = req.params
    const credentials = req.user

    const isChangeLock = await accountsModel.changeLock({
      query: { accountID: accountID },
      credentials: credentials
    })

    if (isChangeLock) {
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
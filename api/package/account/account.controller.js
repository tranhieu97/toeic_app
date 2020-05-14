import jwt from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
const mockUser = {
  username: 'hieu97',
  password: '12345',
  isAdmin: true
}
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
    
  }
}

async function getListAccounts (req, res) {
  try {
    console.log(req.credentials)
    return res.status(200).json({
       message: 'có quyền admin'
    })
  } catch (error) {
    
  }
}

export default {
  signIn,
  signUp,
  getListAccounts
}
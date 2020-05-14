import jwt from 'jsonwebtoken'
import config from '../config'

async function checkIsAdmin (req, res, next) {
  const accessToken = req.headers.authorization

  if(!accessToken || accessToken == undefined ) {
    return res.status(401).json({
      isSuccess: false,
      message: 'UnAuthorization'
    })
  }

  const token = accessToken.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      isSuccess: false,
      message: 'invalid access token'
    })
  }

  const decode = await jwt.decode(token, config.secret)
  
  if (!decode.isAdmin) {
    return res.status(401).json({
      isSuccess: false,
      message: 'invalid access token to role admin'
    })
  }

  req.credentials = decode

  next()
}

export default checkIsAdmin
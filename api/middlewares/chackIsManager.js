import jwt from 'jsonwebtoken'
import config from '../config'


async function checkIsManager (req, res, next) {
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
  

  if (!decode) {
    return res.status(401).json({
      isSuccess: false,
      message: 'invalid access token'
    })
  }

  if(decode.isAdmin) {
    req.user = decode
    return next()
  }

  if (!decode.isManager) {
    return res.status(401).json({
      isSuccess: false,
      message: 'invalid access token to role manager'
    })
  }


  req.user = decode

  return next()
}

export default checkIsAdmin
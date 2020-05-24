import { config} from 'dotenv'
import bcrypt from 'bcrypt'
config()

const app = {
  port : process.env.PORT || 4000,
  secret: process.env.SECRET,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    userName: process.env.DATABASE_USERNAME,
    pass: process.env.DATABASE_PASS,
  },
  admin : {
    fullName: process.env.ADMIN_FULL_NAME, 
    username: process.env.ADMIN_USER_NAME,
    email: process.env.ADMIN_GMAIL, 
    password: bcrypt.hashSync(process.env.ADMIN_PASS, 10), 
    roleId: 1
  }
}

export default app
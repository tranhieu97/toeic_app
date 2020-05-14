import { config} from 'dotenv'
config()

const app = {
  port : process.env.PORT || 4000,
  secret: process.env.SECRET,
}

export default app
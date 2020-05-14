import { config} from 'dotenv'
config()

const app = {
  port : process.env.PORT || 4000
}

export default app
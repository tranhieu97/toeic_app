import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
import cors from 'cors'
import morgan from 'morgan'


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(router())



export default app

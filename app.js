import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(router())

export default app

import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
// const express = require('express');
// const bodyParser = require('body-parser');
// const router = require('./router');

const app = express()

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(router())


export default app

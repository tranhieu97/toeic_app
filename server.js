import http from 'http'
import app from './app'
import config from './api/config'

const port = config.port
const server = http.createServer(app)

server.listen(port, err => {
  if (err) return console.log(err)
  console.log(`SERVER IS RUNNING ON PORT ${port}`)
})
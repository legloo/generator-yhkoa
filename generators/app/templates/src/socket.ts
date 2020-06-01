import * as path from 'path'
import * as fs from 'fs'
import * as config from './config'
import * as socket from 'koa-socket';

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(app, socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  })

  // Insert sockets below
  const apiDir = path.join(__dirname, 'api')
  fs.readdir(apiDir, (error, dirs) => {
    if (error) return console.error(error);
    dirs.forEach(dir => {
      if (/^\./.test(dir)) return;
      fs.stat(`${apiDir}/${dir}/socket.js`, (error, stat) => {
        if (error) return;
        if (stat.isFile()) {
          let setup = require(`./api/${dir}/socket`).setup;
          setup(socket);
        }
      })
    })
  })
}
export function setupSocket(app) {
    new socket().attach(app);
    app._io.on('connection', socket => {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort

    socket.connectedAt = new Date()

    socket.log = (...data) => {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data)
    }

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket)
      socket.log('DISCONNECTED')
    })

    // Call onConnect.
    onConnect(app, socket)
    socket.log('CONNECTED')
  })
}
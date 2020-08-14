const express = require('express');
const app = express();
const server = require('http').createServer(app);
let io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./api/routes/users');
const departmentRoutes = require('./api/routes/department');
const formRoutes = require('./api/routes/form');

const port = process.env.PORT || 4000;
const dbUrl = 'mongodb+srv://shekhar677:HTMsxXY6gWRjPyX@cluster0.l0anz.mongodb.net/approval?retryWrites=true&w=majority'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(mongo => {
  console.log('mongodb connection success');
  // start the server
  server.listen(port, () => {
    console.log(`server running on http://locahost:${port}`)
  })
}).catch(err => {
  console.log('mongodb connection failure: ',err)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json(require('./package.json'))
})

// api routes
app.use('/user', userRoutes);
app.use('/department', departmentRoutes);
app.use('/form', formRoutes);

io.on('connection', (socket) => {
  console.log('user: ',socket.id);
  socket.on('disconnect', () => {
    console.log('user left')
  })
})

function getSocket() {
  return io;
}

// server.listen(port, () => {
//   console.log(`server running on http://locahost:${port}`)
// })


module.exports.getSocket = getSocket;
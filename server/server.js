const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const departmentRoutes = require('./api/routes/department');

const port = process.env.PORT || 4000;
const dbUrl = 'mongodb+srv://shekhar677:HTMsxXY6gWRjPyX@cluster0.l0anz.mongodb.net/approval?retryWrites=true&w=majority'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(mongo => {
  console.log('mongodb connection success')
}).catch(err => {
  console.log('mongodb connection failure: ',err)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json(require('./package.json'))
})

app.use('/user', userRoutes);
app.use('/department', departmentRoutes);

io.on('connect', (socket) => {
  console.log('user connected: ',socket.id)
})

server.listen(port, () => {
  console.log(`server running on http://locahost:${port}`)
})
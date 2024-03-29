const express = require('express')
const app = express();
const port = 3000;


// import AccountModel
const CustomerSchema  = require('./models/module.js')
// const path = require('path')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));


// app.use('/public', express.static(path.join( '/public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})



app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));


var path = require('path');
console.log('__dirname',__dirname)
// '/admin' serve the files at client-admin/build/* as static files
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'))
});
// '/' serve the files at client-customer/build/* as static files
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/home`);
  });
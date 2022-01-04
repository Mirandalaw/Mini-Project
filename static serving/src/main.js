const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 5000;
app.use('/public', express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('Intro');
});
app.get('/signUp', (req, res) => {
  res.render('signUp');
});
app.get('/signIn', (req, res) => {
  res.render('signIn');
});
app.post('/index_check', (req, res) => {
  let id = req.body.id;
  let pw = req.body.pwd;
  console.log(`id:${id}`);
  console.log(`pw:${pw}`);
  res.write("<script>alert('success')</script>");
});
app.listen(PORT, () => {
  console.log(`The Express server is listening at port:${PORT}`);
});

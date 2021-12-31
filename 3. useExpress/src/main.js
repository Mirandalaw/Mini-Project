//@ts-check

const express = require('express');

const app = express();
app.use(express.json());
app.set('views', 'src/views');
app.set('view engine', 'pug');

const PORT = 5000;

// routers/user.js exports import 하는 부분
const userRouter = require('./routers/user');

app.use('/users', userRouter);
app.use('/public', express.static('src/public'));

//err handling 4개의 인자를 넣어주면 express에서 error 알아서 인식
//@ts-ignore
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});
app.listen(PORT, () => {
  console.log(`The Express server is listening at port:${PORT}`);
});

//@ts-check

const express = require('express');

const router = express.Router();

// USER의 Object  -> localhost:${PORT}/users/(ID)
const USERS = {
  1: {
    nickname: 'JH',
  },
  2: {
    nickname: 'MS',
  },
};

//client 가 (???) 요청  => res User list 를 보여줌
router.get('/', (req, res) => {
  res.send('User list');
});

// id의 parmeter 가 value에 저장됨
router.param('id', (req, res, next, value) => {
  //@ts-ignore
  const user = USERS[value];
  if (!user) {
    const err = new Error('User not found');
    //@ts-ignore
    err.statusCode = 404;
    throw err;
  }
  //@ts-ignore
  req.user = user;
  next();
});
// users/(userid)
router.get('/:id', (req, res) => {
  //요청자가 받기를 컨텐츠의 타입을 원하는 것으로 처리해주기
  //json 혹은 html을 돌려줄 수 있음
  const resMinmeType = req.accepts(['json', 'html']);
  // json Type을 요청한 경우
  if (resMinmeType === 'json') {
    //@ts-ignore
    res.send(req.user);
  } // html Type을 요청한 경우
  else if (resMinmeType === 'html') {
    // views에 만들어준 파일 명을 render('(N)')
    res.render('user-profile', {
      //@ts-ignore
      nickname: req.user.nickname,
    });
  }
});
//
router.post('/', (req, res) => {
  res.send('User registerd');
});

router.post('/:id/nickname', (req, res) => {
  //@ts-ignore
  const { user } = req;
  const { nickname } = req.body;

  user.nickname = nickname;

  res.send(`User nickname updated:${nickname}`);
});

module.exports = router;

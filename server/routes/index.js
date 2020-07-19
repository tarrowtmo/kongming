let express = require('express')
let router = express.Router()
let connection = require('../db/sql.js')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
let fs = require('fs')
let app = express()
// 上传图片相关
const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads' })
// 上传图片相关
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
});
// 笔记相关接口
router.get('/list', function (req, res, next) {
  connection.query("select * from note order by id", function (error, results) {
    if (error) {
      throw error
    } else {
      connection.query("select * from note_content order by id", function (error2, results2) {
        if (error2) {
          throw error2
        } else {
          for (var i = 0; i < results.length; i++) {
            results[i].content = []
            for (var j = 0; j < results2.length; j++) {
              if (results[i].id === results2[j].id) {
                results[i].content.push(results2[j])
              }
            }
          }
          // console.log(results)
          res.json(results)
        }
      })
    }
  })
})
// 分页接口
router.get("/css", (req, res) => {
  // 接收前端参数
  let { pageSize, currentPage } = req.query;
  // 默认值
  pageSize = pageSize ? pageSize : 1;
  currentPage = currentPage ? currentPage : 1;
  // 构造sql语句 （查询所有数据 按照时间排序）
  let sqlStr = `select * from animation order by id`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 计算数据总条数
    let total = data.length;

    // 分页条件 (跳过多少条)
    let n = (currentPage - 1) * pageSize;
    // 拼接分页的sql语句 n为索引值(查询起点) pageSize为查询数量
    sqlStr += ` limit ${n}, ${pageSize}`;
    // 执行sql语句 （查询对应页码的数据）
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
      res.send({
        total,
        data
      });
    });
  });
});
// 提交评论
router.post("/comment", function (req, res, next) {
  let { time, comment, pageSize, currentPage, listId, username, userImg } = req.body.params
  // 默认值
  pageSize = pageSize ? pageSize : 1;
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = 'select * from comment order by time desc';
  connection.query("insert into comment(time,comments,id, username, userImg) values('" + time + "','" + comment + "','" + listId + "','" + username + "','" + userImg + "')", function (err, rows) {
    if (err) {
      res.send("新增失败" + err);
    } else {
      connection.query(sqlStr, function (error, results) {
        if (err) {
          res.send("查询失败" + err);
        } else {
          let total = results.length;
          let n = (currentPage - 1) * pageSize;
          sqlStr += ` limit ${n}, ${pageSize}`;
          connection.query(sqlStr, function (error, data) {
            if (err) {
              res.send("查询失败" + err);
            } else {
              res.json({
                total,
                data
              })
            }
          });
        }
      });
    }
  });
});
// 获取列表评论
router.get("/comment", (req, res) => {
  let { pageSize, currentPage } = req.query;
  pageSize = pageSize ? pageSize : 1;
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = 'select * from comment order by time desc';
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    let total = data.length;
    let n = (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      else {
        for (var i = 0; i < data.length; i++) {
          data[i].content = []
        }
        // console.log(data)
        res.send({
          total,
          data
        });
      }

    });
  });
});
// 删除评论
router.get(`/comment/:id`, (req, res) => {
  let Id = req.params.id
  // let Id2 = req.params.id * 100
  let sql = `DELETE FROM comment WHERE id = ${Id}`;
  connection.query(sql, function (error, results) {
    if (error) {
      throw err
    } else {
      let sql2 = `DELETE FROM reComment WHERE Id REGEXP '^${Id}'`;
      connection.query(sql2, function (err, data) {
        if (err) throw err
        else {
          console.log('调用了删除方法')
        }
      })
    }
  })
})
// 提交回复评论
router.post("/reComment", function (req, res, next) {
  let { time, comment, listId, user, recommentuser, userImg, reUserImg } = req.body.params
  let sqlStr = 'select * from reComment order by time desc';
  connection.query("insert into reComment(Id,comments,time,user, recommentuser, userImg, reUserImg) values('" + listId + "','" + comment + "','" + time + "','" + user + "','" + recommentuser + "','" + userImg + "','" + reUserImg + "')", function (err, rows) {
    if (err) {
      res.send("新增失败" + err);
    } else {
      connection.query(sqlStr, function (error, results) {
        if (err) {
          res.send("查询失败" + err);
        } else {
          connection.query(sqlStr, function (error, data) {
            if (err) {
              res.send("查询失败" + err);
            } else {
              res.send({
                data
              })
            }
          });
        }
      });
    }
  });
});
// 获取回复评论
router.get("/reComment", (req, res) => {
  let sqlStr = 'select * from reComment order by time desc';
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      res.send({
        data
      });
    });
  });
});
/*------------------------------    分享板块数据   --------------------------------------------*/
router.get("/noteCard", (req, res) => {
  connection.query('select * from tech', (err, data) => {
    if (err) throw err
    else {
      res.send({
        data
      })
    }
  })
})
/*----------------------------------   注册相关            ----------------------------------------------------*/
// 注册
router.post('/postForm', (req, res) => {
  let { user, email, password, gender, date, dialogImageUrl } = req.body.params
  connection.query("insert into userinfo(user,email, password, gender, date,userImg) values('" + user + "','" + email + "','" + password + "','" + gender + "','" + date + "','" + dialogImageUrl + "')", function (err, data) {
    if (err)
      console.log('有错')
    else {
      console.log(data)
      res.send(data)
    }
  })
})
// 测试邮箱
router.get('/testEmail', (req, res) => {
  let { email, user } = req.query
  connection.query(`select * from userinfo where email = '${email}' OR user = '${user}'`, function (err, data) {
    if (err)
      throw err
    else {
      console.log(data)
      res.send(data)
    }
  })
})
// 登录
router.post('/login', (req, res) => {
  let { user, password } = req.body.params
  let sql = `select * from userinfo where user = '${user}' and password = '${password}'`
  connection.query(sql, function (err, data) {
    if (err) {
      throw err
    } else {
      let token = jwt.sign({ user }, "tarrowtmo")
      const infomation = jwt.verify(token, "tarrowtmo")
      console.log(infomation)
      res.send({ data, infomation, token })

    }
  })
})
// 权限校验
// router.post('/auth', (req, res) => {
//   const token = String(req.headers.authorization).split(' ').pop()
//   console.log(token)
//   const a = jwt.verify(token, "tarrowtmo")
//   console.log(a)
// })
/*----------------------------------   注册相关            ----------------------------------------------------*/
/*----------------------------------   上传图片相关            ----------------------------------------------------*/
router.post('/upload', upload.single('file'), (req, res) => {
  let file = req.file
  var oldPath = file.destination + '\\' + file.filename
  var newPath = file.destination + '\\' + file.originalname
  console.log(newPath)
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err
    }
    console.log('成功')
  })
  // file.url = `http://localhost:8083/server/public/images/${file.originalname}`
  res.send({ file, newPath })
})

/*----------------------------------   上传图片相关            ----------------------------------------------------*/
module.exports = router
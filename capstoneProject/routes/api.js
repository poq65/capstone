var express               = require('express');
var router                = express.Router();
var db                    = require('../references/gonggeumi.js');
var logger                = require('../references/logger.js');
var request               = require('request');

router.post('/retrieve/user', async function(req, res, next) {
  logger.info('User Information');
  logger.info(req.body);

  var returnJson = {}; //json

  try {
    var returnData = await db.retrieveUser();

    logger.info(returnData.length);
    var length = returnData.length;

    returnJson.result = "success";
    returnJson.id = returnData[0].id;
    returnJson.date = returnData[0].date;
    logger.log(returnData);

    res.write(JSON.stringify(returnJson));
    // res.write(returnJson);
    res.end();
  }
  catch(err) {
    logger.error(err);

    returnJson.result = "error";
    returnJson.message = err.message==null?'Internal server error':err.message;

    res.write(JSON.stringify({ 'result': returnJson }));
    // res.write(returnJson);
    res.end();
  }
});

//insert = post / select = get / update = put (http method) / delete = delete(http method) 
router.post('/add/user', async function(req, res, next) {
  logger.info('User Information');
  //logger.info(req.body);

  var returnJson    = {}; //json

  try {

    // 사용자 데이터 삽입을 위한 요청 값
    var reqAddUser    = {};
    reqAddUser.id     = req.body.id;
    reqAddUser.date   = req.body.date;

    // 사용자 데이터 삽입
    var returnData    = await db.addUser(reqAddUser);

    // 사용자 데이터 조회
    returnData        = await db.retrieveUser(reqAddUser);

    // 모든 사용자 데이터가 배열 값이기 때문에 length를 구해야한다.
    var length        = returnData.length;

    // 응답 보낼 json
    returnJson.result = "success";

    // 받은 사용자의 마지막 값 json에 넣음
    returnJson.id     = returnData[length-1].id;
    returnJson.date   = returnData[length-1].date;
    logger.info(returnJson);

    // 응답 보냄
    res.write(JSON.stringify(returnJson));
    res.end();

  } catch(err) {

    returnJson.result = "error";
    returnJson.message = err.message==null?'Internal server error':err.message;
    logger.error(returnJson);

    res.write(JSON.stringify({ 'result': returnJson }));
    res.end();
  }
});


router.post('/add/room', async function(req, res, next) {

  logger.info('Room Information');

   var returnJson    = {}; //json

  try {

    // 방 데이터 삽입을 위한 요청 값
    var reqAddRoom             = {};
    reqAddRoom.id              = req.body.id;
    reqAddRoom.name            = req.body.name;
    reqAddRoom.joinppl         = req.body.joinppl;
    reqAddRoom.regdate         = req.body.regdate;
    reqAddRoom.personalprice   = req.body.personalprice;
    reqAddRoom.carryoverprice  = req.body.carryoverprice;
    reqAddRoom.securitycode    = req.body.securitycode;
    reqAddRoom.deleteflag      = req.body.deleteflag;

    //  데이터 삽입
    var returnData    = await db.addRoom(reqAddRoom);

    var length        = returnData.length;

    // 응답 보낼 json
    returnJson.result = "success";

    // 받은 사용자의 마지막 값 json에 넣음
    returnJson.id              = returnData[length-1].id;
    returnJson.name            = returnData[length-1].name;
    returnJson.joinppl         = returnData[length-1].joinppl;
    returnJson.regdate         = returnData[length-1].regdate;
    returnJson.personalprice   = returnData[length-1].personalprice;
    returnJson.carryoverprice  = returnData[length-1].carryoverprice;
    returnJson.securitycode    = returnData[length-1].securitycode;
    returnJson.deleteflag      = returnData[length-1].deleteflag;

    //logger.info(returnJson);

    // 응답 보냄
    res.write(JSON.stringify(returnJson));
    res.end();

  } catch(err) {

    returnJson.result = "error";
    returnJson.message = err.message==null?'Internal server error':err.message;
    logger.error(returnJson);

    res.write(JSON.stringify({ 'result': returnJson }));
    res.end();
  }



});













module.exports = router;

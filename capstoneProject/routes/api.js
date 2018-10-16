var express               = require('express');
var router                = express.Router();
var db                    = require('../references/gonggeumi.js');
var logger                = require('../references/logger.js');
var request               = require('request');

 //사용자 조회
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

//사용자 추가

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

//방 조회
router.get('/retrieve/room', async function(req, res, next) {
  logger.info('retrieve Room Information');
  logger.info(req.body);

  var returnRoomList = {};

  try {
    var returnData = await db.retrieveRoom();

    logger.info(returnData.length);
    var length = returnData.length;

    returnRoomList.result = "success";
    returnRoomList.data = [];

    var i =0;

    for (i=0; i<length; i++) {

        var item = returnData[i];

        returnRoomList.data.push({

            "id"                : item.id,
            "name"              : item.name,
            "joinppl"           : item.joinppl,
            "regdate"           : item.regdate,
            "personalprice"     : item.personalprice,
            "carryoverprice"    : item.carryoverprice,
            "securitycode"      : item.securitycode,
            "deleteflag"        : item.deleteflag

        });

    }


    logger.log(returnData);

    res.write(JSON.stringify(returnRoomList));
  
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



//방 추가
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
    logger.info(returnJson);

    // 응답 보냄
    res.write(JSON.stringify(returnJson));
    res.end();

  } catch(err) {
    //logger.error(error);
    returnJson.result = "error";
    returnJson.message = err.message==null?'Internal server error':err.message;
    logger.error(returnJson);

    res.write(JSON.stringify({ 'result': returnJson }));
    res.end();
  }



});


//방 삭제
router.post('/delete/room', async function(req, res, next) {

  logger.info('Room Delete');

   var returnJson    = {}; //json

  try {

    // 방 데이터 삽입을 위한 요청 값
    var reqAddRoom             = {};
    reqAddRoom.id              = req.body.id;
    
    reqAddRoom.deleteflag      = req.body.deleteflag;

    //  데이터 삭제
    var returnData    = await db.deleteRoom(reqAddRoom);

    var length        = returnData.length;

    // 응답 보낼 json
    returnJson.result = "success";
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

//공금 입력
router.post('/add/usage', async function(req, res, next) {

  logger.info('Room Information');

   var returnJson    = {}; //json

  try {

    // 방 데이터 삽입을 위한 요청 값
    var reqAddUsage                 = {};
    reqAddUsage.id                  = req.body.id;
    reqAddUsage.userid              = req.body.userid;
    reqAddUsage.roomid              = req.body.roomid;
    reqAddUsage.usageprice          = req.body.usageprice;
    reqAddUsage.date                = req.body.date;
    reqAddUsage.userreaderflag      = req.body.userreaderflag;
    reqAddUsage.memo                = req.body.memo;
    reqAddUsage.deleteflag          = req.body.deleteflag;

    //  공금 데이터 삽입
    var returnData    = await db.addUsage(reqAddUsage);

    var length        = returnData.length;

    // 응답 보낼 json
    returnJson.result = "success";
    logger.info(returnJson);

    // 응답 보냄
    res.write(JSON.stringify(returnJson));
    res.end();

  } catch(err) {
    //logger.error(error);
    returnJson.result = "error";
    returnJson.message = err.message==null?'Internal server error':err.message;
    logger.error(returnJson);

    res.write(JSON.stringify({ 'result': returnJson }));
    res.end();
  }

});


//공금 수정 
router.post('/update/usage', async function(req, res, next) {

  logger.info('Usage update');

   var returnJson    = {}; //json

  try {

    // 공금 데이터 삽입을 위한 요청 값
    var reqUpdateUsage             = {};
    reqUpdateUsage.id              = req.body.id;
    reqUpdateUsage.userid          = req.body.userid;
    reqUpdateUsage.roomid          = req.body.roomid;
    reqUpdateUsage.usageprice      = req.body.usageprice;
    reqUpdateUsage.date            = req.body.date;
    reqUpdateUsage.memo            = req.body.memo;
    reqUpdateUsage.userreaderflag  = req.body.userreaderflag;
    reqUpdateUsage.deleteflag      = req.body.deleteflag;

    
    var returnData    = await db.updateUsage(reqUpdateUsage);

    var length        = returnData.length;

    // 응답 보낼 json
    returnJson.result = "success";
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





module.exports = router;

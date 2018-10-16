var pool = require('./databaseConfig.js');
var Promise = require('bluebird');
var request = require('request');
var logger = require('./logger.js');


/*
작성자 : 유지현
모듈 설명 : 사용자 정보 조회하기
*/
exports.retrieveUser = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Retrieve User Information');

    var queryStr = "SELECT * ";
    queryStr += "FROM user";

    pool.query(queryStr, function(error, rows, fields) {
      if (error) {
        logger.info(error);
        reject(new Error('Retrieve User Info Error'));
      } else {
      	logger.info(rows);
        resolve(rows);
      }
    });
  });
}

// 사용자 생성 
exports.addUser = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Insert User Information');
    logger.info(data);

    var sql = "INSERT INTO user (id, date) VALUES ('"+data.id+"', '"+data.date+"')";

    pool.query(sql, function (error, rows, fields) {
      if (error) {
        logger.error(error);
        reject(new Error('Insert User Inforrmation'));
      } else {
          logger.error(error);
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}
  
//방 정보 조회
exports.retrieveRoom = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Retrieve Room Information');

    var queryStr = "SELECT * ";
    queryStr += "FROM room";

    pool.query(queryStr, function(error, rows, fields) {
      if (error) {
        logger.info(error);
        reject(new Error('Retrieve Room Info Error'));
      } else {
        logger.info("여기?");
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}


// 방 생성
exports.addRoom = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Insert Room Information');
    logger.info(data);

    var sql = "INSERT INTO room (id, name, joinppl, regdate, personalprice, carryoverprice, securitycode, deleteflag) VALUES ("+data.id+", '"+data.name+"', "+data.joinppl+", '"+data.regdate+"', "+data.carryoverprice+", "+data.personalprice+", "+data.securitycode+", '"+data.deleteflag+"')";

    pool.query(sql, function (error, rows, fields) {
      if (error) {

        logger.error(error);
        reject(new Error('Insert User Inforrmation'));
      } else {
          logger.error(error);
         logger.info(sql);
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}

//방 삭제
exports.deleteRoom = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Delete Room Information');
    logger.info(data);

    var sql = "UPDATE room SET deleteflag='N' WHERE id="+data.id+"";

    pool.query(sql, function (error, rows, fields) {
      if (error) {

        logger.error(error);
        reject(new Error('DeleteFlag User Inforrmation'));
      } else {
        logger.info(sql);
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}

//방 참여



//공금 입력
exports.addUsage = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Insert Usage Information');
    logger.info(data);

    var sql = "INSERT INTO `usage` (id, userid, roomid, usageprice, date, userreaderflag, memo, deleteflag) VALUES ("+data.id+","+data.userid+","+data.roomid+","+data.usageprice+",'"+data.date+"','"+data.userreaderflag+"','"+data.memo+"','"+data.deleteflag+"')";

    pool.query(sql, function (error, rows, fields) {
      if (error) {

        logger.error(error);
        reject(new Error('Insert Usage Inforrmation'));
      } else {
        
         logger.info(sql);
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}


//공금 수정
exports.updateUsage = function (data) {
  return new Promise(function(resolve, reject) {
    logger.info('Update Usage Information');
    logger.info(data);

    var sql = "UPDATE `usage` SET usageprice="+data.usageprice+", memo='"+data.memo+"', deleteflag='"+data.deleteflag+"', userreaderflag='"+data.userreaderflag+"' WHERE id="+data.id+" and userid="+data.userid+" and roomid="+data.roomid+"";

    pool.query(sql, function (error, rows, fields) {
      if (error) {

        logger.error(error);
        reject(new Error('Update Usage Inforrmation'));
      } else {
        
         logger.info(sql);
        logger.info(rows);
        resolve(rows);
      }
    });
  });
}


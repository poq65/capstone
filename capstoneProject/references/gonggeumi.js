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

    var sql = "INSERT INTO room (id, name, joinppl, regdate, personalprice, carryoverprice, securitycode, deleteflag) VALUES ('"+data.id+"', '"+data.name+"', '"+data.joinppl+"', '"+data.regdate+"', '"+data.carryoverprice+"', '"+data.personalprice+"', '"+data.securitycode+"', '"+data.deleteflag+"')";

    pool.query(sql, function (error, rows, fields) {
      if (error) {

        logger.error(error);
        reject(new Error('Insert User Inforrmation'));
      } else {

        logger.info(rows);
        resolve(rows);
      }
    });
  });
}

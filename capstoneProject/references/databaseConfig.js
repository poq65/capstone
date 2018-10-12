var mysql = require('mysql');

var db_port = '3306';
var db_user = 'jihyun';
var db_pw = 'Pcn02165';
// var db_host = '52.69.58.115';
var db_host = 'capstonedb.clchtekmtm71.ap-northeast-2.rds.amazonaws.com';
var db_database = 'gonggeumi';

var config = {
  host: db_host,
  user: db_user,
  password: db_pw,
  database: db_database,
  connectionLimit: 30
};

var pool = mysql.createPool(config); 

module.exports = pool;
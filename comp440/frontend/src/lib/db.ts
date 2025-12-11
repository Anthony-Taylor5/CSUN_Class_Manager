import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sub2sneeg',
  database: 'class_scheduler'
});

export default connection;
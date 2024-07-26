const mysql = require('mysql2');
const Transport = require('winston-transport');

 class MySQLTransport extends Transport {
    constructor(opts) {
      super(opts);
      this.connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Admin@123',
        database: 'winston'
      })
      
    }
  
    log(info, callback) {
      setImmediate(() => {
        this.emit('logged', info);
      });
  
      const {level, message, timestamp} = info;

      const sql = `INSERT INTO logs (level, message, timestamp) VALUES (?, ?, ?)`;
      this.connection.query(sql, [level, message, timestamp], (err)=>{
        if(err){
            console.log(err)
        }
      })
      
  
      callback();
    }
  };

  module.exports = MySQLTransport;

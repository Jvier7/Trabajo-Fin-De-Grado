const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

var db_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'TFG'
  }

var connection
function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on('error', function (err) {
    console.log('db error', err);
    handleDisconnect();
  });
}
handleDisconnect();

app.get('/', (req, res) => {
    
    let sql = 'SELECT * FROM users';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });

    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);
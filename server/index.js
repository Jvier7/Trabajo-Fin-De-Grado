const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3090;

app.use(cors);

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
    
    return res.send('Hello World!');
    
    }
);

// Siempre dejar abajo, porque es cuando se ejecuta el servidor

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);

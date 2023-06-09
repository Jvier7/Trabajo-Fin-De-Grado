const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const port = 6090;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/jointscounter.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/jointscounter.com/privkey.pem')
};

var db_config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'tY3rbpYG8&@W1l^t.a',
  database: 'TFG'
}

// var db_config = {
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'TFG'
// }

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
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'Select * from users where email = "' + email + '" and password = "' + password + '"';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.post('/api/cookie', (req, res) => {
  const { hash } = req.body;
  const query = 'Select * from users where hash = "' + hash + '"';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'Select * from todo where user_id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/api/deleteTask/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM todo WHERE id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/api/makeImportant/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE todo SET priority = 1 WHERE id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/api/makeUnimportant/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE todo SET priority = 0 WHERE id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  // comprobar que no haya otro usuario con el mismo email
  const query = 'Select * from users where email = "' + email + '"';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'Ya existe un usuario con ese email' })
    } else {
      const hash = bcrypt.genSaltSync(17);
      const query = 'INSERT INTO users (name, email, password, hash) VALUES ("' + name + '", "' + email + '", "' + password + '", "' + hash + '")';
      connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});

app.get('/api/setNotCompleted/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE todo SET isCompleted = 0 WHERE id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/api/isCompleted/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE todo SET isCompleted = 1 WHERE id = ' + id;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.post('/api/addTasks', (req, res) => {
  const { text, userId } = req.body;
  const query = 'INSERT INTO todo (text, user_id, priority, isCompleted) VALUES ("' + text + '", ' + userId + ', 0, ' + false + ')';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.post('/api/profile/', (req, res) => {
  const { user, array, actualPassword } = req.body;
  if (actualPassword != user.password || actualPassword == '') {
    console.log({ actualPassword, user })
    res.send({ message: 'La contraseña actual no coincide' })
  }
  const patata = 'UPDATE users SET '
  const patata2 = ' WHERE id = ' + user.id;
  let values = '';
  array.forEach((element, index) => {
    if (element.type == 'string') {
      element.val = '"' + element.val + '"';
    }
    values += element.column + " = " + element.val;

    if (index != array.length - 1) {
      values += ", ";
    }
  })
  let query = patata + values + patata2;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
  }
  );
  res.send(true)
});

// Siempre dejar abajo, porque es cuando se ejecuta el servidor

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// });

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log('Servidor HTTPS escuchando en el puerto ' + port);
});

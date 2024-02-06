var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'inventory',
  password: 'xPStMLTGh6HBKPaQ',
  database: 'inventory'
});

var app = express()
app.use(cors())
app.use(express.json())

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})

app.get('/equipments', function (req, res, next) {
    connection.query(
      'SELECT * FROM `equipments`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })
  
  app.get('/equipments/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM `/equipments` WHERE `id` = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.post('/equipments', function (req, res, next) {
    connection.query(
      'INSERT INTO `equipments`(`nameInv`, `numberInv`, `buildingInv`, `roomInv`, `responsibleInv`,`SNInv`,`companyInv`,`companyMailInv`,`companyPhoneInv`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.body.nameInv, req.body.numberInv, req.body.buildingInv, req.body.roomInv, req.body.responsibleInv, req.body.SNInv, req.body.companyInv, req.body.companyMailInv, req.body.companyPhoneInv],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.put('/equipments', function (req, res, next) {
    connection.query(
      'UPDATE `equipments` SET `nameInv`=?,`numberInv`=?,`buildingInv`=?,`roomInv`=?,`responsibleInv`=?,`SNInv`=?,`companyInv`=?,`companyMailInv`=?,`companyPhoneInv`=? WHERE `id` = ?',
      [req.body.nameInv, req.body.numberInv, req.body.buildingInv, req.body.roomInv, req.body.responsibleInv, req.body.SNInv, req.body.companyInv, req.body.companyMailInv, req.body.companyPhoneInv, req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.delete('/equipments', function (req, res, next) {
    connection.query(
      'DELETE FROM `equipments` WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })
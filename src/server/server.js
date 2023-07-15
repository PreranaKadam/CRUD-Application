const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employeelist'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// REST API endpoints
app.post('/api/employee', (req, res) => {
  const employee = req.body;
  connection.query('INSERT INTO employees SET ?', employee, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/api/employee', (req, res) => {
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/api/employee/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM employees WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

app.put('/api/employee/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  connection.query('UPDATE employees SET ? WHERE id = ?', [employee, id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


app.delete('/api/employee/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM employees WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.delete('/api/employee', (req, res) => {
  connection.query('DELETE FROM employees', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/api/employee/search', (req, res) => {
  const keyword = req.query.name;
  connection.query('SELECT * FROM employees WHERE name LIKE ?', `%${keyword}%`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

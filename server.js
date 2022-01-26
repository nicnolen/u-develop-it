// Import npm packages
// Import Express.js
const express = require('express');
const res = require('express/lib/response');
// Import mysql2
const mysql = require('mysql2');

// Import personal files
const inputCheck = require('./utils/inputCheck');

// Add the PORT designation
const PORT = process.env.PORT || 3001;
// Make app expression for express.js
const app = express();

// Express.js middleware
// Recognize incoming Request Objects as strings or arrays
app.use(express.urlencoded({ extended: false }));
// Recognize incoming Request Object as a JSON Object
app.use(express.json());

// Connect to the mysql2 database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password
    password: '',
    database: 'election',
  },
  console.log('Connected to the election database.')
);

// return all the data in the candidates table
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// DELETE a candidate
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found',
      });
    } else {
      res.json({
        message: 'successfully deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// CREATE a candidate using a POST route
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// Add a route to handle user requests that aren't supported by the app
app.use((req, res) => {
  res.status(404).end();
});

// Start the express server on port 3001 (connection function)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

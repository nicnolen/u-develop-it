// Import npm packages
// Import Express.js
const express = require('express');
const res = require('express/lib/response');
// Import mysql2
const mysql = require('mysql2');

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
  const sql = `SELECT * FROM candidates`;

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
  const sql = `SELECT * FROM candidates WHERE id = ?`;
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

// // CREATE a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.error(err);
//   }
//   console.info(result);
// });

// Add a route to handle user requests that aren't supported by the app
app.use((req, res) => {
  res.status(404).end();
});

// Start the express server on port 3001 (connection function)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import npm packages
// Import Express.js
const express = require('express');
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

// // return all the data in the candidates table
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// // GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.error(err);
//   }
//   console.info(row);
// });

// // DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// CREATE a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.error(err);
  }
  console.info(result);
});

// Add a route to handle user requests that aren't supported by the app
app.use((req, res) => {
  res.status(404).end();
});

// Start the express server on port 3001 (connection function)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import dependencies
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET route for votes
router.get('/votes', (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count
               FROM votes
               LEFT JOIN candidates ON votes.candidate_id = candidates.id
               LEFT JOIN parties ON candidates.party_id = parties.id
               GROUP BY candidate_id ORDER BY count DESC;`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// POST route for votes
router.post('/vote', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'voter_id', 'candidate_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
  const params = [body.voter_id, body.candidate_id];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: results.affectedRows,
    });
  });
});

// Export the file
module.exports = router;

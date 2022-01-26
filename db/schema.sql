/* HELPFUL TIPS: Each column has (column_name data_type(num of characters), NOT NULL
NOT NULL means the column cant be blank
AUTOINCREMENT (automatically increments for each row starting from 1) 
PRIMARY KEY(gives unique values) */

/* Drop tables if they exist */
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;

/* Create a parties table */
CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

/* Create a candidates table with 4 columns.*/
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

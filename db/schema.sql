/* HELPFUL TIPS: Each column has (column_name data_type(num of characters), NOT NULL
NOT NULL means the column cant be blank
AUTOINCREMENT (automatically increments for each row starting from 1) 
PRIMARY KEY(gives unique values) */

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
  industry_connected BOOLEAN NOT NULL
);

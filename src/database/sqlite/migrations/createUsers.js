
const bcrypt = require("bcryptjs")

const createUsers = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    is_admin BIT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createAdmin = `
  INSERT INTO users (name, email, password, is_admin)
  SELECT 'admin', 'admin@email.com', '${bcrypt.hashSync('123456',8)}', 1
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = 'admin');
`;

module.exports = { createUsers,createAdmin };

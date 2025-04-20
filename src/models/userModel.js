const pool = require('../../config/database');

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

const createUser = async (userData) => {

    let query = 'INSERT INTO users (name, email, password, phone_number, role';
  let values = [userData.name, userData.email, userData.password, userData.phone_number, userData.role];
  let returning = 'RETURNING id, name, email, role';

  if (userData.role === 'service-center') {
    query += ', village_name, crops_catered_to) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    values.push(userData.village_name, userData.crops_catered_to);
  } else if (userData.role === 'farmer') {
    query += ') VALUES ($1, $2, $3, $4, $5)';
  }

  query += ' ' + returning;

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


module.exports = { findUserByEmail, createUser };
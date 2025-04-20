const bcrypt= require('bcrypt');
const pool= require('../../src/config/database');
const jwt = require('jsonwebtoken');
const secretKey = 'thisisasecretkeyforjsonwebtoken';

const registerSCP = async (req, res) => {
    //res.send('Handling SCP registration');
    try {
        const { name, email, password, phone_number } = req.body;
    
        if (!name || !email || !password || !phone_number) {
          return res.status(400).json({ message: 'All fields are required for SCP registration.' });
        }
    
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]); 
        if (existingUser.rows.length > 0) {
          return res.status(409).json({ message: 'Email is already registered.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10); //Hash password
    
        const newUser = await pool.query(
          'INSERT INTO users (name, email, password, phone_number, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
          [name, email, hashedPassword, phone_number, 'service-center']
        );
    
        return res.status(201).json({ message: 'SCP registered successfully!', user: newUser.rows[0] });
    
      } catch (error) {
        console.error('Error registering SCP:', error);
        return res.status(500).json({ message: 'Failed to register SCP.' });
      }
    };

  
  const registerFarmer = async (req, res) => {
    //res.send('Handling farmer registration');
    try {
        const { name, email, password, phone_number } = req.body;
    
        if (!name || !email || !password || !phone_number) {
          return res.status(400).json({ message: 'All fields are required for farmer registration.' });
        }
    
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]); //check existing email
        if (existingUser.rows.length > 0) {
          return res.status(409).json({ message: 'Email is already registered.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10); //hash password
    
        const newUser = await pool.query(
          'INSERT INTO users (name, email, password, phone_number, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
          [name, email, hashedPassword, phone_number, 'farmer']
        );
    
        return res.status(201).json({ message: 'Farmer registered successfully!', user: newUser.rows[0] });
    
      } catch (error) {
        console.error('Error registering farmer:', error);
        return res.status(500).json({ message: 'Failed to register farmer.' });
      }
    
  };
  
  const loginSCP = async (req, res) => {
    //res.send('Handling SCP login');
    try { 
        const { email,password } = req.body;

        if(!email || ! password) { 
            return res.status ( 400 ).json({ message: 'Email and password are required for login '});
        }

        const user= await pool.query ('SELECT * FROM users WHERE email = $1 AND role =$2', [email, 'service-center']);

        if( user.rows.length ===0){
            return res.status(401).json({ message: 'Invalid credentials.'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
          }
      
          const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, secretKey, { expiresIn: '1h' }); // jwt token
      
          return res.status(200).json({ message: 'SCP logged in successfully!', token });
      
    }    catch (error) {
          console.error('Error logging in SCP:', error);
          return res.status(500).json({ message: 'Failed to login SCP.' });
        }
};
  
  const loginFarmer = async (req, res) => {
    //res.send('Handling farmer login');
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required for login.' });
        }
    
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'farmer']);
    
        if (user.rows.length === 0) {
          return res.status(401).json({ message: 'Invalid credentials.' }); // Unauthorized
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials.' });
        }
    
        const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, secretKey, { expiresIn: '1h' });
    
        return res.status(200).json({ message: 'Farmer logged in successfully!', token });
    
      } catch (error) {
        console.error('Error logging in farmer:', error);
        return res.status(500).json({ message: 'Failed to login farmer.' });
      }

  };
  
  module.exports = {
    registerSCP,
    registerFarmer,
    loginSCP,
    loginFarmer,
  };
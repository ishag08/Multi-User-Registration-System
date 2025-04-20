// scpController.js
const bcrypt = require('bcrypt');
const pool = require('../../src/config/database');

const getDashboard = async (req, res) => {
 //res.send('SCP Dashboard');
 try {
  const scpId = req.user.userId;

  const scpResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1 AND role = $2', [scpId, 'service-center']);
  const scpDetails = scpResult.rows[0];

  if (!scpDetails) {
   return res.status(404).json({ message: 'SCP not found.' });
  }

  const farmersResult = await pool.query('SELECT id, name, email FROM users WHERE registered_by_scp_id = $1 AND role = $2', [scpId, 'farmer']);
  const registeredFarmers = farmersResult.rows;

  const responseData = {
   scp: scpDetails,
   registeredFarmers: registeredFarmers
  };
  return res.status(200).json(responseData);

 } catch (error) {
  console.error('Error fetching SCP dashboard data:', error);
  return res.status(500).json({ message: 'Failed to fetch SCP dashboard data.' });
 }
};

const registerFarmerBySCP = async (req, res) => {
 try {
  const { name, phone_number, village_name, crop_catered_to, email, password } = req.body;
  const registered_by_scp_id = req.user.userId;

  console.log('req.user:', req.user);
  console.log('registered_by_scp_id:', registered_by_scp_id);

  if (!name || !phone_number || !village_name || !crop_catered_to || !email || !password) {
   return res.status(400).json({ message: 'Name,phone number, village name, crop type are required to register a farmer.' });
  }
  const existingFarmer = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'farmer']);
  if (existingFarmer.rows.length > 0) {
   return res.status(409).json({ message: 'Farmer email is already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newFarmer = await pool.query(
   'INSERT INTO users ( name,phone_number,village_name, crops_catered_to, role,registered_by_scp_id,email,password) VALUES($1, $2, $3, $4, $5,$6,$7, $8) RETURNING id, name , phone_number, village_name, crops_catered_to,email',
   [name, phone_number, village_name, crop_catered_to, 'farmer', registered_by_scp_id, email, hashedPassword]
  );


  return res.status(201).json({ message: 'Farmer registered by SCP successfully!', farmer: newFarmer.rows[0] });

 } catch (error) {
  console.error('Error registering farmer by SCP:', error);
  return res.status(500).json({ message: 'Failed tp register farmer.' });
 }
};

module.exports = {
 getDashboard,
 registerFarmerBySCP,
};
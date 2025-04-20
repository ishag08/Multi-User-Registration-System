// farmerController.js
const pool = require('../../src/config/database');


const getNetwork = async (req, res) => {
 //res.send('Farmer Network');
 try {
  const farmerId = req.user.userId;

  const farmerResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1 AND role = $2', [farmerId, 'farmer']);
  const farmerDetails = farmerResult.rows[0];

  if (!farmerDetails) {
   return res.status(404).json({ message: 'Farmer not found.' });
  }

  const scpNetworkResult = await pool.query('SELECT id, name, email FROM users WHERE id = (SELECT registered_by_scp_id FROM users WHERE id = $1 AND role = $2)', [farmerId, 'farmer']);
  const registeredScp = scpNetworkResult.rows[0];
  return res.status(200).json({ farmer: farmerDetails, registeredScp });

 } catch (error) {
  console.error('Error fetching farmer network data:', error);
  return res.status(500).json({ message: 'Failed to fetch farmer network data.' });
 }

};

module.exports = {
 getNetwork,
};
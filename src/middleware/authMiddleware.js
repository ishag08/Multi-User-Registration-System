const jwt = require('jsonwebtoken');
const secretKey = 'thisisasecretkeyforjsonwebtoken'; 

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Received Authorization header:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.log('Incorrect token format:', token); 
    return res.status(401).json({ message: 'Token format is invalid.' });
  }

  const actualToken = tokenParts[1];

  try {
    const decoded = jwt.verify(actualToken, secretKey);
    console.log('Token decoded successfully:', decoded);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Token verification error:', error); 
    res.status(401).json({ message: 'Token is invalid.' });
  }
};

const authorizeSCP = (req, res, next) => {
  if (req.user && req.user.role === 'service-center') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Requires service center role.' });
  }
};

const authorizeFarmer = (req, res, next) => {
  if (req.user && req.user.role === 'farmer') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Requires farmer role.' });
  }
};

module.exports = { authenticate, authorizeSCP, authorizeFarmer };
const express = require('express');
const router = express.Router();
var os = require('os');
var ip = require('ip');
const today = new Date();

const year = today.getFullYear(); 
router.get('/', (req, res) => {
  var publicIP = req.headers['x-forwarded-for'] || req.remoteAddress || req.socket.remoteAddress || req.socket.remoteAddress;
  const userInfo = os.userInfo();
  const username = userInfo.username;

  var localIP = ip.address();
  res.render('index', { title: 'First Web Node', publicIP: publicIP, username: username, localIP: localIP ,currentYear: year });
  
});

router.get('/contact', (req, res) => { 

  res.render('contact', { title: 'Contact Page',currentYear: year });
});

module.exports = router;

const express = require('express');
const router = express.Router();
var os = require('os');
var ip = require('ip');
var https = require('https');
const { response } = require('express');

const today = new Date();
const year = today.getFullYear(); 
var extPublicIP = '';
var currentOS = process.platform;


function getUsername() {
  return (
      process.env.SUDO_USER ||
      process.env.C9_USER ||
      process.env.LOGNAME ||
      process.env.USER ||
      process.env.LNAME ||
      process.env.USERNAME
  );
};

var processUserName = getUsername();



var callback = function(err, ip){
  if(err){
      return console.log(err);
  }
  console.log('Our public IP is', ip);
  // do something here with the IP address
};

https.get({
  host: 'api.ipify.org',
}, function(response) {
  extPublicIP = '';
  response.on('data', function(d) {
    extPublicIP += d;
  });
  // response.on('end', function() {
  //     if(ip){
  //         callback(null, ip);
  //     } else {
  //         callback('could not get public ip address :(');
  //     }
  // });
});
router.get('/', (req, res) => {
  var publicIP = req.headers['x-forwarded-for'] || req.remoteAddress || req.socket.remoteAddress || req.socket.remoteAddress;
  const userInfo = os.userInfo();
  const username = userInfo.username;
  var localIP = ip.address();
  
  res.render('index', { title: 'First Web Node', publicIP: publicIP, username: username,alternateUserName: processUserName ,localIP: localIP ,currentYear: year , publicAPIIP: extPublicIP, currentOS: currentOS});
});

router.get('/contact', (req, res) => { 

  res.render('contact', { title: 'Contact Page',currentYear: year });
});


module.exports = router;

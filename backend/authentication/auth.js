const crypto = require('crypto');

exports.encrypt = (password) => {
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(password, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr;
}
//updating config.json to use environment variables during run time
const fs = require('fs');
const fileName = './config.json';
require('dotenv').config()

const json = {
    "type": process.env.PROJECT_TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_CERT_URL
  }

fs.writeFile(fileName, JSON.stringify(json, null, 2), function writeJSON(err) {
    if (err)
        return console.log(err);
    console.log('config updated...');
});
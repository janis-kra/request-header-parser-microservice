const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

const langRegexp = /^[a-z]{2}\-[A-Z]{2}/;
const softwareRegexp = /\([-,;\.:\w\s]+\)/;

app.get('/', function (req, res) {
  const lang = langRegexp.exec(req.header('Accept-Language'))[0];
  const userAgent = softwareRegexp
    .exec(req.header('User-Agent'))[0]
    .slice(1, -1);
  const ips = [
    'HTTP_CLIENT_IP',
    'HTTP_X_FORWARDED_FOR',
    'HTTP_X_FORWARDED',
    'HTTP_X_CLUSTER_CLIENT_IP',
    'HTTP_FORWARDED_FOR',
    'HTTP_FORWARDED',
    'REMOTE_ADDR'
  ].map(function (header) {
    return req.header(header);
  });
  res.send({
    ipaddress: JSON.stringify(ips) || 'IP not found',
    language: lang || 'lang not found',
    software: userAgent || 'OS not found'
  });
});

app.listen(PORT, function () {
  console.log('Request Header Parser Microservice running on port ' + PORT);
})

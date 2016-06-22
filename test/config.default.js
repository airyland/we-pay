var fs = require('fs')

module.exports = {
  app: {
    appid: 'appid',
    mch_id: 'mch_id',
    partner_key: 'partner_key',
    pfx: fs.readFileSync('./apiclient_cert.p12')
  },
  openid: 'opneid'
  
}
var app = require('koa')()
var router = require('koa-router')()
var Wepay = require('../')
var config = require('./config')

router.post('/api/callback', Wepay.middleware, function*(next) {
  console.log(this.wechatPayMessage)
  this.wechatReply('success')
})

router.get('/api/jsapi', function*(next) {
  var wx = new Wepay(config.app)
  this.body = yield wx.getBrandWCPayRequestParams({
    openid: config.openid,
    body: '公众号支付测试',
    detail: '公众号支付测试',
    out_trade_no: '20160622' + Math.random().toString().substr(2, 10),
    total_fee: 1,
    spbill_create_ip: '192.168.2.210',
    notify_url: 'https://some.secret.domain/wechat/callback'
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(6009)

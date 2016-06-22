# we-pay

> 该模块为 [weixin-pay](https://github.com/tvrcgo/weixin-pay) 的封装

## install

``` bash
npm install we-pay --save
```

``` javascript
var Wepay = require('we-pay')

var wepay = new Wepay({
  appid: 'appid',
  mch_id: 'mch_id',
  partner_key: 'partner_key',
  pfx: fs.readFileSync('./apiclient_cert.p12')
})
```

## koa middleware

``` javascript
router.post('/api/callback', Wepay.middleware, function *(next) {
  console.log(this.wechatPayMessage)
  this.wechatReply('success')
  // this.wechatReply('fail')
})
```

## API

### 创建统一支付订单

``` javascript
wepay.createUnifiedOrder({
  body: '扫码支付测试',
  out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
  total_fee: 1,
  spbill_create_ip: '192.168.2.210',
  notify_url: 'http://wxpay_notify_url',
  trade_type: 'NATIVE',
  product_id: '1234567890'
})
```

### 查询订单

``` javascript
// 通过微信订单号查
var rs = yield wepay.queryOrder({ transaction_id:"xxxxxx" })

// 通过商户订单号查
var rs = yield wepay.queryOrder({ out_trade_no:"xxxxxx" })
```

### 关闭订单

``` javascript
var rs = yield wepay.closeOrder({ out_trade_no:"xxxxxx"})
```

### 退款

``` javascript
var params = {
    appid: 'xxxxxxxx',
    mch_id: '1234567890',
    op_user_id: '商户号即可',
    out_refund_no: '20140703'+Math.random().toString().substr(2, 10),
    total_fee: '1', //原支付金额
    refund_fee: '1', //退款金额
    transaction_id: '微信订单号'
}

var rs = yield wxpay.refund(params);
```

### 生成公众号支付参数

``` javascript
var params = yield wepay.getBrandWCPayRequestParams({
  openid: config.openid,
  body: '公众号支付测试',
  detail: '公众号支付测试',
  out_trade_no: '20160622' + Math.random().toString().substr(2, 10),
  total_fee: 1,
  spbill_create_ip: '192.168.2.210',
  notify_url: 'https://some.secret.domain/wechat/callback'
})
```

前端页面调用

``` javascript
WeixinJSBridge.invoke(
  getBrandWCPayRequest", params, function(res){
    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
      // success
    }
});
```


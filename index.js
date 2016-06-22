'use strict'

var WXPay = require('weixin-pay')
var thunkify = require('thunkify')
var fs = require('fs')
var util = require('weixin-pay/lib/util')
var getRawBody = require('raw-body')
var parseXML = thunkify(util.parseXML)

var Wepay = class {
  constructor(options) {
    var _this = this
    var _wxpay = WXPay(options);
    ['createUnifiedOrder', 'queryOrder', 'closeOrder', 'refund', 'createMerchantPrepayUrl', 'getBrandWCPayRequestParams'].forEach(function(fn) {
      _this[fn] = thunkify(function(options, cb) {
        _wxpay[fn](options, cb)
      })
    })
  }
}

module.exports = Wepay
module.exports.middleware = function*(next) {
  const _this = this
  var xml = yield getRawBody(this.req, {
    length: this.length,
    limit: '1mb',
    encoding: this.charset
  })
  this.wechatPayMessage = yield parseXML(xml.toString())
  this.wechatReply = function(status) {
    _this.body = util.buildXML({
      xml: {
        return_code: status.toUpperCase()
      }
    })
  }
  yield next
}

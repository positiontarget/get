const logger = require('../util/logger')('response/check-cookie');

module.exports = (req, res) => (code, message, data) => {
  if (code === 0) {
    data = {
      openid: String(data.openid || data.openId || '').trim(),
      sign: String(data.sign || data.eleme_key).trim(),
      sid: String(data.sid).trim(),
      headimgurl: String(data.headimgurl || data.avatar || data.imgUrl || '').trim(),
      nickname: data.nickname || '',
      service: data.service
    };
  }
  const r = {
    code,
    message,
    data
  };
  res.json(r);
  logger.info('%j', r);
};

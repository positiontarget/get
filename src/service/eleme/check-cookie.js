const cookie2sns = require('./core/cookie2sns');
const Request = require('./core/request');
const logger = require('../../util/logger')('service/eleme');
const checkCookieResponse = require('../check-cookie-response');

module.exports = async (req, res) => {
  const {cookie} = req.body;
  const response = checkCookieResponse(req, res);

  try {
    const sns = cookie2sns(cookie);
    if (!sns || !sns.openid || !sns.eleme_key || !sns.sid) {
      return response(1, 'cookie 不正确，请按照教程一步一步获取');
    }

    const request = new Request({sn: '29e47b57971c1c9d'});
    const data = await request.hongbao(sns);

    if (data.name) {
      return response(1, `${data.name} ${data.message}`);
    }

    // 如果要判断是否领满 5 次，则打开这个注释
    // if (data.ret_code === 5) {
    //   return response(2, '请换一个不领饿了么红包的小号来贡献');
    // }

    if (!data.account) {
      return response(3, 'cookie 未通过手机短信验证，请先绑定手机号再来');
    }

    response(0, 'cookie 验证通过', sns);
  } catch (e) {
    logger.error(e.message);
    response(1, 'cookie 不正确，请按照教程一步一步获取');
  }
};

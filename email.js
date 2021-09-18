const nodeMailer = require('nodemailer');
const {getConfig, log} = require('./util.js');

/**
 * @description 通过qq邮箱发送
 * @param {string} subject 邮件标题
 * @param {string} html 邮件内容
 * @date: 2021/9/18
 */
const sendEmailFromQQ = async (subject, html) => {
    let cfg = getConfig()?.email?.qq;
    if (!cfg || !cfg.user || !cfg.pass) return;
    const transporter = nodeMailer.createTransport({service: 'qq', auth: {user: cfg.user, pass: cfg.pass}});
    transporter.sendMail({
        from: cfg.from,
        to: cfg.to,
        subject: subject,
        html: html
    }, (err) => {
        if (err) return log(`发送邮件失败：${err}`, true);
        log('发送邮件成功')
    })
}

module.exports = {
    sendEmailFromQQ
}

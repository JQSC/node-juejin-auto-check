const axios = require('axios');
const {log, getConfig} = require('./util.js');
const {sendEmailFromQQ} = require('./email.js')

// 获取今天免费抽奖的次数
const getTodayDrawStatus = async () => {
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.getLotteryConfig, method: 'get', headers: {Cookie: cookie}});
    if (data.err_no) {
        return {error: true, isDraw: false}
    } else {
        return {error: false, isDraw: data.data.free_count === 0}
    }
}

// 抽奖
const draw = async () => {
    let {error, isDraw} = await getTodayDrawStatus();
    if (error) return log('查询抽奖次数失败', true);
    if (isDraw) return log('今日已无免费抽奖次数', true);
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.drawLottery, method: 'post', headers: {Cookie: cookie}});
    if (data.err_no) return log('免费抽奖失败', true);
    log(`恭喜抽到：${data.data.lottery_name}`);
}

// 查询今日是否已经签到
const getTodayCheckStatus = async () => {
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.getTodayStatus, method: 'get', headers: {Cookie: cookie}});
    if (data.err_no) {
        await sendEmailFromQQ('今日掘金签到查询：失败', JSON.stringify(data));
    }
    return {error: data.err_no !== 0, isCheck: data.data}
}

// 签到
const checkIn = async () => {
    let {error, isCheck} = await getTodayCheckStatus();
    if (error) return log('查询签到失败', true);
    if (isCheck) return log('今日已参与签到', true);
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.checkIn, method: 'post', headers: {Cookie: cookie}});
    if (data.err_no) {
        log('签到失败', true);
        await sendEmailFromQQ('今日掘金签到：失败', JSON.stringify(data));
    } else {
        log(`签到成功！当前积分：${data.data.sum_point}`);
        await sendEmailFromQQ('今日掘金签到：成功', JSON.stringify(data));
    }

}

module.exports = {
    checkIn,
    draw
}

const axios = require('axios');
const dayjs = require('dayjs');
const chalk = require('chalk');
const fs = require('fs');
const configPath = './config.json';

// 打印
const log = (message, isError = false) => {
    if (isError) {
        console.log(chalk.red(dayjs().format('YYYY-MM-DD HH:mm:ss'), message));
    } else {
        console.log(chalk.blue(dayjs().format('YYYY-MM-DD HH:mm:ss'), message));
    }
}

// 获取配置
const getConfig = () => {
    return JSON.parse(fs.readFileSync(configPath));
}

// 获取今天免费抽奖的次数
const getTodayDrawStatus = async () => {
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.getLotteryConfig, method: 'get', headers: {Cookie: cookie}});
    return {error: data.err_no !== 0, isDraw: data?.data?.free_count === 0};
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
    return {error: data.err_no !== 0, isCheck: data.data}
}

// 签到
const checkIn = async () => {
    let {error, isCheck} = await getTodayCheckStatus();
    if (error) return log('查询签到失败', true);
    if (isCheck) return log('今日已参与签到', true);
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.checkIn, method: 'post', headers: {Cookie: cookie}});
    if (data.err_no) return log('签到失败', true);
    log(`签到成功！当前积分：${data.data.sum_point}`);
}

module.exports = {
    checkIn,
    draw
}

// 掘金相关接口

const axios = require('axios');
const dayjs = require('dayjs');
const fs = require('fs');
const configPath = './config.json';

// 获取配置
const getConfig = () => {
    return JSON.parse(fs.readFileSync(configPath));
}

// 签到
const checkIn = async () => {
    const {cookie, baseUrl, apiUrl} = getConfig();
    let {data} = await axios({url: baseUrl + apiUrl.checkIn, method: 'post', headers: {Cookie: cookie}})
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), data);
}

module.exports = {
    checkIn
}

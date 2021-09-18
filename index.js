const cron = require('node-cron')
const juejin = require('./juejin.js');

// 凌晨一点整签到
cron.schedule('0 1 * * *', () => {
    juejin.checkIn();
})

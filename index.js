const cron = require('node-cron')
const juejin = require('./juejin.js');

// 定时器
cron.schedule('0 1 * * *', async () => {
// cron.schedule('*/5 * * * * *', async () => {
    await juejin.checkIn();
    await juejin.draw();
})

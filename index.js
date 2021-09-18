const Cron = require('cron').CronJob;
const {log} = require('./util.js');
const juejin = require('./juejin.js');

let job = new Cron('0 1 * * *', async () => {
    await juejin.checkIn();
    await juejin.draw();
}, null, false)

log('开始运行')

job.start();

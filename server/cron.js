const cron = require('cron');
const https = require('https');

const url= `https://studynotion-zfck.onrender.com/api/v1/course/getallcategories`;
const job = new cron.CronJob('*/14 * * * *',function(){
    https.get(url,(res)=>{
        if(res.statusCode === 200){
            ('Server Restarted');
        }
        else{
            console.error('Failed to start server');
        }
    }).on('error',(err)=>{
    })
})

module.exports = job;
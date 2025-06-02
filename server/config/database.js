const mongoose = require("mongoose");
require("dotenv").config();
async function connectWithDB(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{ console.log('DB Connected Successfully')})
        .catch((e)=>{
            console.log('Error in connecting Database');
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectWithDB
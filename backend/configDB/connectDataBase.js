const mongoose = require('mongoose')

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URL)
    .then((data)=>{
        console.log(`dataBase connected ${data.connection.host}`);
        
    })
    .catch((error)=>{
        console.log(error.message);
        
    })
}

module.exports = connectDataBase
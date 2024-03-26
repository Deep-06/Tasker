const mongoose=require('mongoose');

const connection = () =>{
    mongoose
    .connect(process.env.MONGO_URL, {
       dbName: "Tasker",
    })
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(`error while connecting ${err}`)
    })
}


module.exports={
    connection
}
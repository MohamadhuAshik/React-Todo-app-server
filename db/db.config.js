const mongoose = require("mongoose")
const dotEnv = require("dotenv")
dotEnv.config()

const connectionString = process.env.DB_CONNECTION

const mongoConnection = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("MongoDb Connected")

    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoConnection 
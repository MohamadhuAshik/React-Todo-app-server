const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Name: String,
    MailId: String,
    Password: String,
    CreatedDate: {
        type: Date,
        default: () => new Date()
    },
    UpdatedDate: Date
})
const modelCreation = mongoose.model("User", userSchema)

module.exports = modelCreation
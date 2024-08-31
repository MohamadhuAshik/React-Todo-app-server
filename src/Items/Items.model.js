

const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Item: String,
    Checked: { type: Boolean, default: false },
    datetime: { type: Date, default: () => new Date() },
    updatedDate: Date
})

const modelCreation = mongoose.model("Item", itemSchema)

module.exports = modelCreation
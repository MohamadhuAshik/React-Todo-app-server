const express = require("express")
const model = require("./Items.model")
const userModel = require("../User/User.model")


module.exports = {
    getItems: async (req, res) => {
        try {
            const userFind = await userModel.findOne({ MailId: req.mailId })
            if (!userFind) {
                return res.status(404).json({ message: "User not found" })
            }


            const postFind = await model.find({ User: userFind._id })
            res.status(200).json({ response_code: 200, items: postFind })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },



    createItem: async (req, res) => {
        try {
            const { Item } = req.body
            if (!Item) {
                res.status(400).json({ message: "Required fields are missing" })
            }
            const userCheck = await userModel.findOne({ MailId: req.mailId })
            if (!userCheck) {
                return res.status(404).json({ message: "Invalid user" })
            }
            const postItem = model({
                User: userCheck._id,
                Item: Item,
            })
            await postItem.save()
            res.status(200).json({ response_code: 200, message: "Post Save Successfully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },

    updateItem: async (req, res) => {
        try {
            const id = req.params
            if (!id) {
                res.status(400).json({ message: "Required fields are missing" })
            }
            const postCheck = await model.findOne({ _id: id.id })
            if (!postCheck) {
                return res.status(404).json({ message: "Item Not Found" })
            }
            const checkState = !postCheck.Checked
            const result = await model.updateOne(
                { _id: id.id },
                {
                    $set: {
                        Checked: checkState,

                        updatedDate: new Date()
                    }
                }
            )
            if (!result.acknowledged) {
                return res.status(400).json({ message: "update Failure" })
            }
            res.status(200).json({ response_code: 200, message: "item Update Successfully" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server Error", err: err.message })
        }
    },

    deleteItem: async (req, res) => {
        try {
            const id = req.params
            const result = await model.deleteOne({
                _id: id.id
            })
            if (!result.acknowledged) {
                res.status(400).json({ message: "Delete Failure" })
            }
            res.status(200).json({ response_code: 200, message: "Post Delete Successfully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    }

}
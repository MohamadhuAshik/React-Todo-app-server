const express = require("express")
const { LoginAuth } = require("../../auth/JWT")
const { getItems, createItem, updateItem, deleteItem } = require("./Items.controller")

const router = express.Router()

router.get("/get", LoginAuth, getItems)

router.post("/post", LoginAuth, createItem)

router.patch("/edit/:id", updateItem)

router.delete("/delete/:id", deleteItem)

module.exports = router
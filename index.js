const express = require("express")
const cors = require("cors")
const mongoConnection = require("./db/db.config")
const items = require("./src/Items/Items.routes")
const users = require("./src/User/User.routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const PORT = 6969

app.get("/", (req, res) => {
    res.json({ message: `Server is Running on http://localhost:${PORT}` })
})


app.use("/users", users)

app.use("/items", items)

mongoConnection()

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`Server is Running on http://localhost:${PORT}`)
})
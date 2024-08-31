const jwt = require("jsonwebtoken")

module.exports = {
    LoginAuth: (req, res, next) => {
        try {
            const token = req.header("Authorization")?.split(" ")[1]

            if (!token) {
                return res.status(401).json({ response_code: 401, error: "Access denied" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.mailId = decoded.mailId
            console.log("mailId :", req.mailId)
            next()
        } catch (err) {
            console.log(err)
            res.status(401).json({ message: "Invalid Token" })
        }

    }
}
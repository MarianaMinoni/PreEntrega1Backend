export const auth = function (req,res, next) {
    const {username, password} =req.query
    if (username !== "Marian" || password !== "Marian1500" ){
        return res.send("login failed")
    }

    req.session.user = username
    req.session.admin = true

    return next()
}
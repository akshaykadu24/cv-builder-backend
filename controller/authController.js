const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../models/User.Model")

const RegisterUser = async (req, res) => {
    console.log("reg", req.body)
    let { name, email, phone, password } = req.body

    try {
        let user = await userModel.find({ email })
        console.log(user)
        if (user?.length == 0) {

            bcrypt.hash(password, 10).then(async function (hash) {
                let newUser = await userModel({ name: name, email: email, phone: phone, password: hash })
                let userSaved = await newUser.save()
                console.log("User Created successfully")
                res.send({ msg: "User Created successfully" })
            })

        } else {
            res.send({ msg: "User is already registred" })
        }

    } catch (error) {
        console.log("Error in user creation", error)
        res.send({ msg: "user is not created" })
    }

}

const Login = async (req, res) => {
    console.log("reg", req.body)
    let { email, password } = req.body

    try {
        let user = await userModel.find({ email })
        console.log(user)
        if (user?.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                console.log(result, err)
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'shhhhh');

                    console.log("user Login successfully")
                    res.send({
                        msg: "user Login successfully",
                        userID: user[0]._id,
                        name: user[0].name,
                        token: token,
                    })

                } else {
                    console.log("Incorrect password")
                    res.send({ msg: "Incorrect password" })

                }
            });


        } else {
            res.send({ msg: "User is Not Registred" })
        }

    } catch (error) {
        console.log("Error in user creation", error)
        res.send({ msg: "user is not created" })
    }

}

const VerifyToken = (req, res) => {
    res.send({ success: true, userID: req.userID })
}

module.exports = { RegisterUser, Login, VerifyToken } 
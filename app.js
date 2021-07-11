const express = require('express');
//connect mongoDB
const mongoDB = require('./connection')
const app = express();
const user = require('./userSchema')
//use cors
var cors = require('cors');
//use jwt
var jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())
//check token
app.use(require('./middleware').checkAPITokens)

app.get('/get_users', async (req, res) => {

    try {
        const getUsers = await user.find();
        console.log("", getUsers.length);
        if (getUserByID.length > 0) {
            res.status(200)
            res.send({
                values: getUsers,
            })
        } else {
            res.status(400)
            res.send("User not Found")
        }

    } catch {
        res.status(400)
        res.send("User not Found")
    }



})

app.get('/users/:id', async (req, res) => {


    try {

        let _id = req.params.id

        const getUserByID = await user.findById(_id);
        console.log("", getUserByID);
        res.status(200)
        res.send({
            values: getUserByID,
        })
    } catch {
        res.status(400)
        res.send("User not Found")
    }




})

app.put('/users/:id', async (req, res) => {


    try {
        const _id = req.params.id
        const getUserByID = await user.findById(_id);

        if (getUserByID != null) {
            const updateUserByID = await user.findByIdAndUpdate(_id, req.body, { new: true });
            res.status(200)
            res.send({
                values: updateUserByID,
            })
        } else {
            res.status(400)
            res.send("User not Found")
        }

    } catch {
        res.status(400)
        res.send("User not Updated")
    }



})

app.delete('/users/:id', async (req, res) => {

    try {
        const _id = req.params.id
        const getUserByID = await user.findById(_id);
        console.log("ss", getUserByID);
        if (getUserByID != null) {
            const deleteUserByID = await user.findByIdAndDelete(req.params.id);
            res.status(200)
            res.send({
                "message": "User is Deleted",
            })
        } else {
            res.status(400)
            res.send("User not Found")
        }

    } catch {
        res.status(400)
        res.send("User not Deleted")
    }


})

app.post('/users', function (req, res) {
    const newUser = new user(req.body)
    var token = jwt.sign({ username: "Deepak", password: "1234" }, 'secretkey')
    newUser.save().then(() => {
        res.send({
            status: 200,
            token: token,
            values: newUser,

        })

    }).catch(() => {
        res.status(400)
        res.send("User not Inserted")
    })

})

app.listen(3000, () => {
    console.log("server is running")
})
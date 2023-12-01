const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())


// const pass = 'sIcAvRZCliyMj7Yi'
//Schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

const PORT = process.env.PORT || 8080


//read
// "http://localhost:8080/"
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//create data || save data in mongodb
// "http://localhost:8080/create"
// {
//     name, 
//     email, 
//     mobile
// }
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully", data: data })
})

//update data
// "http://localhost:8080/update"
// {
//     id:"",
//     name:"", 
//     email:"", 
//     mobile:""
// }
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    // const updateUser = await userModel.findByIdAndUpdate(id, rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated sccessfully", data: data })
})

//delete api
// "http://localhost:8080/delete/id"
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "data deleted sccessfully", data: data })
})


mongoose.connect("mongodb+srv://hemumani73:sIcAvRZCliyMj7Yi@cluster0.4wd1kim.mongodb.net/crud")
    .then(() => {
        console.log("Connect to DB")
        app.listen(PORT, () => console.log("Server is Running"))
    })
    .catch((err) => console.log(err))

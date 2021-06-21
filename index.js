const express = require("express");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTasks");
require("dotenv").config({path: ".env" });
var back = "#ffffff";
var text = "#000000";

//hide DB connection
dotenv.config()
//connect to the Database
mongoose.connect(process.env.DATABASE_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},
console.log("connected")
)
//view engine configuration
app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: true }));
//Get method
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", {todoTasks: tasks});
    });
});
//POST method
app.post("/", async (req, res) => {
    const todoTask = new TodoTask({
        name: req.body.name,
        bgColor: req.body.bgColor,
        textColor: req.body.textColor,
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});
//Update method
// app
//     .route("/edit/:id")
//     .get((req,res)=>{
//         const id = req.params.id;
//         TodoTask.find({}, (err,tasks)=>{
//             res.render("todoEdit.ejs", {todoTasks: tasks, idTask: id });
//         });
//     })
//     .post((req,res)=>{
//         const id = req.params.id;
//         TodoTask.findByIdAndUpdate(id, { name: req.body.name }, (err) => {
//             if(err) return res.send(500,err);
//             res.redirect("/");
//         });
//     });
//Delete method
app
    .route("/remove/:id")
    .get((req,res)=>{
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id,(err)=>{
            if(err) return res.send(500,err);
            res.redirect("/");
        });
    });
// Apply Changes to Page
app
    .route("/select/:id")
    .get((req,res)=>{
        const id = req.params.id;
        TodoTask.findById(id, (err, docs)=>{
            if(err) return console.log(err);
            else {
                back = docs.bgColor;
                text = docs.textColor;
                console.log("bg: "+back+" text: "+text);
                return {back, text}
            }
        });
    })
function senders(){
    return new Promise(colorful =>{
        colorful = [back,text];
    });
}
// app
//     .route("/select/:id")
//     .post("/", async (req,res)=>{
//         try{
//             senders();
//         }catch(err){
//             console.log(err);
//         }
//     })
//Server Start
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});
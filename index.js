const express = require("express"); //I need it
const app = express(); //It's important
const PORT = 3000; //Not actually important, but makes it easy to change the port and have it apply throughout the code
const dotenv = require("dotenv"); //I use it
const mongoose = require("mongoose"); //Really Really useful
const TodoTask = require("./models/TodoTasks"); //What makes the above actually useful
require("dotenv").config({path: ".env" }); //I need to connect to my database
var back = "#bada55"; //Need to declare before I send the page to the client or else crash
var text = "#000000"; //Same as above

//hide DB connection
dotenv.config()
//connect to the Database
mongoose.connect(process.env.DATABASE_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},
// console.log("connected") //Useful tool in debug
)
//view engine configuration
app.set("view engine", "ejs"); //I'm using embedded javascript
app.use("/static", express.static("public")); //something something, I don't actually know
app.use(express.urlencoded({extended: true }));
//Get method
app.get("/", (req, res) => { //when root path is loaded, get these
    TodoTask.find({}, (err, tasks) => { //check the database
        res.render("todo.ejs", {todoTasks: tasks, back:back, text:text}); //render the database and my color options
    });
});
//POST method
app.post("/", async (req, res) => { //when root gives me something
    const todoTask = new TodoTask({ //create a todoTask based on my model
        name: req.body.name, //it contains this
        bgColor: req.body.bgColor, //and this
        textColor: req.body.textColor, //and also this
    });
    try { //once I have things
        await todoTask.save(); //try adding it to the database
        res.redirect("/"); //return to root
    } catch (err) { //if it fails
        console.log(err); //tell me why
        res.redirect("/"); //and return to root
    }
});
//Delete method
app
    .route("/remove/:id") //if I press a thing that has the remove route (by id)
    .get((req,res)=>{ //I want to get some info
        const id = req.params.id; //what was the id?
        TodoTask.findByIdAndRemove(id,(err)=>{ //find that id and remove it from the database
            if(err) return res.send(500,err); //if you screw that up, tell me why
            res.redirect("/"); //return to root
        });
    });
// Apply Changes to Page
app
    .route("/select/:id") //if I press a thing that has the select route (by id)
    .get((req,res)=>{ //I want to get some info
        const id = req.params.id; //what was the id?
        TodoTask.findById(id, (err, docs)=>{ //find that id in the database
            if(err) return console.log(err); //if you screw that up, tell me why
            else { //otherwise
                back = docs.bgColor; //I'm changing a variable used in rendering my root path
                text = docs.textColor; //this one too
                res.redirect("/"); //return to root (re-render, theres new data here this time)
            }
        });
    })
//Server Start
app.listen(PORT, () => { //Pop open a server on port PORT(3000)
    console.log(`Server is up and running on port: ${PORT}`); //tell me what port I'm using
});
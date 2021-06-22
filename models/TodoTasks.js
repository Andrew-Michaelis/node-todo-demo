const mongoose = require("mongoose"); //this is a mongoose thing, of course I need mongoose
const todoTaskSchema = new mongoose.Schema({ //I'm building a template to use later
    name: {
        type: String,
        required: true, //the name is REQUIRED, the other things not so much
    },
    bgColor: {
        type: String,
    },
    textColor: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, //I don't actually give this data anywhere, it adds itself in
    },
});

module.exports = mongoose.model("TodoTask", todoTaskSchema); //this template is used elsewhere, of course I make sure other places can use it
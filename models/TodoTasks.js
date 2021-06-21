const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
    },
    textColor: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("TodoTask", todoTaskSchema);
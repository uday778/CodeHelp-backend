const mongoose = require('mongoose');
const todoschema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 50,
        },
        description: {
            type: String,
            required: true,
            maxlength: 50,
        },
        createdate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedate: {
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);
module.exports = mongoose.model("todo", todoschema);

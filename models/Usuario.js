const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eAdmin:{
        type:Number,
        default: 0
    },
    password:{
        type: String,
        required: true
    }
});

mongoose.model("usuario", Usuario);
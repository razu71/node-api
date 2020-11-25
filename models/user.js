var mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
    id: { type: Number, unique: true },
    name: { type: String, require: true },
    email: {
        type: String, require: true, unique: true, validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: { type: String, require: true }
},
    {
        versionKey: false
    });

module.exports = mongoose.model("User", userModel);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
      },
      password: {
        type: String,
        required: true,
        min: 8,
      },
      isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },
},{
    timestamps : true,
})

module.exports = mongoose.model("User", User);
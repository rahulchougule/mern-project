var mongoose = require("mongoose");

var roleSchema = mongoose.Schema({
    roleId: Number,
    roleName: String
})
module.exports = mongoose.model("Role", roleSchema, "Role");


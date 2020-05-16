var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/5000");

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection malfunction, connection malfunction"));
db.once('open', function () {

})
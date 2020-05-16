var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vases");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  //should be connected

  var vaseSchema = new mongoose.Schema({
    province: String,
    date: Date
  });

  var typeSchema = new mongoose.Schema({
    shape: String,
    height: Number,
    vases: [vaseSchema]
  });

  var Type = mongoose.model("Type", typeSchema)
  var Vase = mongoose.model("Vase", vaseSchema);

  var type = new Type({ shape: "lekythos", height: 10, vases: squatlekythoi });
  var squatlekythoi = new Vase({ province: "Attica", date: new Date(-500, 0) });
  console.log(squatlekythoi);
  type.save(function (err, type) {
    if (err) return console.error(err);
    console.log("types too");
  });
  squatlekythoi.save(function (err, squatlekythoi) {
    if (err) return console.error(err);
    console.log("victory!");
  });
});

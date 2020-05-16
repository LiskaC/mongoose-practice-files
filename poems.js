var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/5000");

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection malfunction, connection malfunction"));
db.once('open', function () {

  var poemSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: Date
  });

  var Poem = mongoose.model('Poem', poemSchema);

  var byzantium = new Poem({ name: "Sailing to Byzantium", author: "Yeats", date: 1928 })

  const savePoem = (poem) => {
    poem.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`woot ${poem} saveeddd`);
      }
    })
  }

  savePoem(byzantium);

  const listPoems = () => {
    Poem.find({}, (err, poems) => {
      poems.forEach((poem) => {
        console.log('and the next poem is: ' + poem.name);
      })
    })
  }

  const promisePoems = () => {
    Poem.find({})
      .then((results) => {
        console.log("here are all the poems you could possibly want: " + results)
      })
      .catch((err) => {
        console.log("there was some error hmmm: " + err);
      })
  }


  listPoems();
  promisePoems();
})
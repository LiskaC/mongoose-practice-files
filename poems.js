const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/5000");

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection malfunction, connection malfunction"));
db.once('open', function () {

  const poemSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: Date
  });

  const Poem = mongoose.model('Poem', poemSchema);

  let byzantium = new Poem({ name: "Sailing to Byzantium", author: "Yeats", date: 1928 })

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

  let multiplePoems = Poem.insertMany([{ name: "The General", author: "Siegfried Sassoon", date: 1919 }, { name: "Odi et Amo", author: "Catullus", date: -67 }]);


  //this doesn't work, why?
  const addManyPoems = (poemList) => {
    console.log("do we come in here?")
    Promise.all(poemList)
      .then(poems => {
        console.log("poems added by: " + values.author);
      })
      .catch(err => console.log(err));
  }

  addManyPoems(multiplePoems);

})
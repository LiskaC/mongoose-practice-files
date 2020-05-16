#! /usr/local/bin/node
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  pages: Number
})

var Book = mongoose.model('Book', bookSchema);

var SlaughterHouse5 = new Book({
  name: "SlaughterHouse5",
  author: "Kurt Vonnegut",
  pages: 5
});

Book.find({ name: "SlaughterHouse5" }, function (err, books) {
  if (err) return console.log(err);
  if (books.length == 0) {
    return SlaughterHouse5.save(function (err, SlaughterHouse5) {
      if (err) return console.log(err);
      db.close();
    });
  };
  console.log(books[0]);
  db.close();
})

console.log(process.argv);
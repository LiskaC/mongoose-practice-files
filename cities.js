const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/citiesDB");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("disconnected", () => {
  console.log("mongoose is disconnected");
})

db.once("open", () => {

  var citySchema = new mongoose.Schema({
    name: String,
    population: Number
  });

  citySchema.methods.makePlan = () => {
    console.log(this);
    var plan = this.name ? "I would like to move to " + this.name
      : "I can't find which city I would like to move to";
    console.log(plan);
  }

  var City = mongoose.model('City', citySchema);

  //making sydney
  var sydney = new City({ name: "Sydney", population: 1000 });
  //saving sydney
  const saveCity = (city) => {
    city.save((err, city) => {
      if (err) return console.error(err);
      city.makePlan();
    });
  }
  saveCity(sydney);

  //a function to both make and save cities easily
  const makeCity = (cityName, cityPop) => {
    const city = new City({ name: cityName, population: cityPop });
    city.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`hurrah! ${cityName} saved!`)
      }
    });
  }

  makeCity("Brisbane", 3000);

  //find and log all of the cities
  const showCities = () => {
    City.find((err, cities) => {
      if (err) return console.error(err);
      console.log(cities)
    })
  };

  showCities();

  //find and log one city - this crashes for some reason
  //City.find({ name: "Sydney" }, callback);
})

//next -> update, delete



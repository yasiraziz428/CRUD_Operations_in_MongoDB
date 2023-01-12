const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/fruitsDB", {
  useNewUrlParser: true,
});

//Fruit Collection
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified!"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  review: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  name: "Strawberry",
  rating: 5,
  review: "Worst experience. Never buy this!",
});
fruit.save();

//Person Collection
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema, // creating relationship
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: fruit,
});
person.save();

//Inserting many documents to Fruit Collection
const Kiwi = {
  name: "Kiwi",
  rating: 3,
  review: "Good",
};
const Orange = {
  name: "Orange",
  rating: 4,
  review: "Very Sour!!",
};
const Banana = {
  name: "Banana",
  rating: 5,
  review: "Expired",
};
// Fruit.insertMany([Kiwi, Orange, Banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the data!");
//   }
// });

// READ
Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    // mongoose.connection.close();
    fruits.forEach((element) => {
      console.log(element.name);
    });
  }
});

//UPDATE
// Fruit.updateOne(
//   { _id: "63bf01a902d536e21142a9be" },
//   { name: "Peach" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated the document!");
//     }
//   }
// );

//DELETE
// Fruit.deleteOne({ _id: "63bf01a902d536e21142a9be" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document!");
//   }
// });

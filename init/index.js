let Reqdata = require("../init/data.js");
const list = require("../models/listening.js");
// getting-started.js
const mongoose = require('mongoose');

main().then(() => {
  console.log("db connection is done.");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

// const initdata = async () => {
//   await list.deleteMany({});
//   console.log(Reqdata);
//   Reqdata = Reqdata.map((obj) => ({ ...obj, owner: "67139ecccc061cfe9561e5f0" }));
//   console.log(Reqdata);
//   await list.insertMany(Reqdata);
//   console.log("data is added.");
// };
const initdata = () => {
  list.deleteMany({}).then((res) => {
    console.log(res);
  });
  Reqdata = Reqdata.map((obj) => ({ ...obj, owner: "67139ecccc061cfe9561e5f0" }));
  list.insertMany(Reqdata).then((res) => {
    console.log(res);
  });
  console.log("data is saved");
}
initdata();
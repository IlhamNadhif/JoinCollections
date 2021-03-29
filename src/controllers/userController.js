const User = require("../models/user");
const Biodata = require("../models/biodata");

const createUser = (req, res) => {
  Biodata.create({
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
  })
    .then((biodata) => {
      User.create({
        email: req.body.email,
        password: req.body.password,
        biodata_id: biodata._id,
      })
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const findAllUsers = (req, res) => {
  User.aggregate([
    {
      $lookup: {
        localField: "biodata_id",
        from: "biodatas",
        foreignField: "_id",
        as: "user_biodata",
      },
    },
  ]).then((result) => {
    res.json(result);
  });
};

module.exports = {
  createUser,
  findAllUsers,
};

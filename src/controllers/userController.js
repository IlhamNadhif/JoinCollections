const User = require("../models/user");
const Biodata = require("../models/biodata");

const createUser = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      Biodata.create({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        user: user._id,
      })
        .then((biodata) => {
          res.json(biodata);
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
        localField: "_id",
        from: "biodatas",
        foreignField: "user",
        as: "user_biodata",
      },
    },
  ])
  .then(result=>{
    res.json(result)
  })
};

module.exports = {
  createUser,
  findAllUsers,
};

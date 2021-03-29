const User = require("../models/user");
const Biodata = require("../models/biodata");
const Comment = require("../models/comment");

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
        biodata: biodata._id,
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

const findAllUsers = async (req, res) => {
  const users = await User.find().populate("biodata").populate("comments");
  res.json(users);
};

const findOneUserAndUpdate = (req, res) => {
  Comment.create({
    text: req.body.text,
  }).then((comment) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment._id },
      },
      { new: true, useFindAndModify: false }
    ).then((user) => {
      res.json(user);
    });
  });
};

// const deleteUser = (req, res) => {
//   User.deleteOne({_id: req.params.id})
//   .then(user=>{
//     Biodata.deleteOne({_id: user.biodata})
//     Comment.dele
//   })
// };



module.exports = {
  createUser,
  findAllUsers,
  findOneUserAndUpdate,
  // deleteUser,
};

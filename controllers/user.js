//Importing userModel
const User = require("../models/user");

//Contoller getUser
exports.getUsers = async (req, res, next) => {
  try {
    //Finding the users in db
    const users = await User.find();
    //Returning the status and a JSON message with the data
    res
      .status(200)
      .json({ message: "Users fetched successfully!", data: users });
  } catch (err) {
    //If an error exists then will be send to error middleware the error and its status
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Controller createUser
exports.createUser = async (req, res, next) => {
  //Retrieving the page data
  const {name, email, okrs} = req.body;

  //Creating a user at mongodb
  const user = new User({
    name: name,
    email: email,
    okrs: okrs,
  });

  try {
    //Saving the user in DB
    await user.save();
    //JSN message when create an user
    res.status(201).json({
      message: "User created successfully!",
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Controller to get an user
exports.getUser = async(req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
    res.status(200).json({message: `User ${user.name} fetched.`, data: user})
  }
  catch (err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

//Controller to update an user
exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    user.name = req.body.name;
    user.email = req.body.email;
    user.okrs = req.body.okrs;
    const result = await user.save();
    res.status(200).json({ message: "User updated!", data: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Controller to delete an user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try{
    await User.findByIdAndRemove(userId)
    res.status(200).json({message: 'User deleted.'})
  }
  catch (err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

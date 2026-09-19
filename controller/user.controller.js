const { User } = require("../models");
const { faker } = require("@faker-js/faker");

const getUsers = async (req, res) => {
  let { page = 1 } = req.query;
  try {
    page = parseInt(page) ?? 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    for (let i = 0; i < 100; i++) {
      await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.number.int({ min: 18, max: 65 }),
        city: faker.location.city(),
      });
    }
    const users = await User.find().skip(skip).limit(limit);

    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, age, city } = req.body;
  try {
    const newUser = new User({ name, email, age, city });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { age, city } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { age, city },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

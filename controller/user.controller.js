const { User, Profile, Order, Product, Category } = require("../models");
const { faker } = require("@faker-js/faker");

const getUsers = async (req, res) => {
  let { page = 1 } = req.query;
  try {
    page = parseInt(page) ?? 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    // const users = await User.aggregate([
    //   {
    //     $match: {
    //       age: { $gt: 25 },
    //     },
    //   },

    //   {
    //     $sort: { age: -1 },
    //   },
    //   {
    //     $skip: skip,
    //   },
    //   {
    //     $limit: limit,
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       age: 1,
    //       name: 1,
    //     },
    //   },
    // ]);

    const users = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          "user.name": 1,
          "user.email": 1,
          amount: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "profile",
        select: "-_id -userId phone address",
      })
      .populate({
        path: "orders",
        select: "-_id -userId amount status",
      });
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

const getProducts = async (req, res) => {
  try {
    // const data = await Product.find().populate("categoryIds");
    const data = await Category.find().populate({
      path: "products",
      select: "-_id -categoryIds productName price",
    });
    res.status(200).json({ message: "Products retrieved successfully", data });
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
  getProducts,
};

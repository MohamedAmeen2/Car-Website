import User from "../models/User.js";
import Car from "../models/Car.js";
import mongoose from "mongoose";

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("index", { user, cars: await Car.find() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ errMsg: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ errMsg: "Server error", error });
  }
};

const purchaseCar = async (req, res) => {
  const userId = req.params.id;
  const { purchaseDetails } = req.body;

  const car = await Car.findById(purchaseDetails.carId);
  if (car.quantity == 0)
    return res
      .status(500)
      .json({ errMsg: "Car out of stock .. try again later" });
  else car.quantity--;
  car.save();

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user.purchases) user.purchases = [];
    user.purchases.push(purchaseDetails);
    user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ errMsg: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  await User.findByIdAndDelete(id);

  res.json({ message: "User deleted successfully" });
};

export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  purchaseCar,
  deleteUser,
};

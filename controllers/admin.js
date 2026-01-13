import User from "../models/User.js";
import Car from "../models/Car.js";

const homePage = async (req, res) => {
  res.redirect(`/admin/${req.params.userId}/cars`);
};

const usersPage = async (req, res) => {
  res.render("admin/users", {
    user: await User.findById(req.params.userId),
    users: await User.find(),
  });
};

const userDetailsPage = async (req, res) => {


  res.render("admin/userDetails", {
    user: await User.findById(req.params.userId),
    targetUser: await User.findById(req.params.targetUserId),
  });
};

const carsPage = async (req, res) => {
  res.render("admin/cars", {
    user: await User.findById(req.params.userId),
    cars: await Car.find(),
  });
};

const addCarPage = async (req, res) => {
  res.render("admin/addCar", {
    user: await User.findById(req.params.userId),
  });
};

const editeCarPage = async (req, res) => {
  res.render("admin/editeCar", {
    user: await User.findById(req.params.userId),
    car: await Car.findById(req.params.carId),
  });
};

export {
  homePage,
  usersPage,
  userDetailsPage,
  carsPage,
  addCarPage,
  editeCarPage,
};

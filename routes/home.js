import express from "express";
import Car from "../models/Car.js";
import User from "../models/User.js";

import { signIn_get, signIn_post } from "../controllers/registration/signin.js";
import { signUp_get, signUp_post } from "../controllers/registration/signUp.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index", { user: null, cars: await Car.find().limit(4) });
});

router.get("/cars", async (req, res) => {
  res.render("cars", { user: null, cars: await Car.find() });
});

router.get("/cars-details/:id", async (req, res) => {
  res.render("carDetail", {
    user: false,
    car: await Car.findById(req.params.id),
  });
});

////////////////////////////////////////////////////////////////////////////////

router.get("/user/:userId", async (req, res) => {
  res.render("index", {
    user: await User.findById(req.params.userId),
    cars: await Car.find().limit(4),
  });
});

router.get("/user/:userId/cars", async (req, res) => {
  res.render("cars", {
    user: await User.findById(req.params.userId),
    cars: await Car.find(),
  });
});

router.get("/user/:userId/cars-details/:carId", async (req, res) => {
  res.render("carDetail", {
    user: await User.findById(req.params.userId),
    car: await Car.findById(req.params.carId),
  });
});

router.get("/user/:userId/cars-details/:carId/purchase", async (req, res) => {
  res.render("purchase", {
    user: await User.findById(req.params.userId),
    car: await Car.findById(req.params.carId),
  });
});


router.get("/signin", signIn_get);
router.post("/signin", signIn_post);

router.get("/signup", signUp_get);
router.post("/signup", signUp_post);

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

export default router;

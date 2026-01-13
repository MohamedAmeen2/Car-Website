import express from "express";

import {
  homePage,
  usersPage,
  userDetailsPage,

  carsPage,
  addCarPage,
  editeCarPage
} from "../controllers/admin.js";

const router = express.Router();

router.get("/:userId", homePage);
router.get("/:userId/users", usersPage);
router.get("/:userId/user/:targetUserId", userDetailsPage);

router.get("/:userId/cars", carsPage);
router.get("/:userId/add-car", addCarPage);
router.get("/:userId/cars/:carId", editeCarPage);


export default router;

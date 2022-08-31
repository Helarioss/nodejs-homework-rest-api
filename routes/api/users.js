const express = require("express");

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const schemas = require("../../schemas");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.userSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(schemas.userSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.patch(
  "/subscription",
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);

module.exports = router;

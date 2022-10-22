const express = require("express");

const router = express.Router();
const { userJoiSchema } = require("../../models/user");
const userFunctions = require("../../controllers/users");
const middlewares = require("../../middlewares");

router.post("/signup", async (req, res, next) => {
  try {
    const value = await userJoiSchema.validate(req.body);
    const newUser = req.body;
    if (!value) {
      throw new Error({
        status: 400,
        message: "Ошибка от Joi или другой библиотеки валидации",
      });
    }
    const result = await userFunctions.signup(newUser);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const value = await userJoiSchema.validate(req.body);
    const userData = req.body;
    if (!value) {
      throw new Error({
        status: 400,
        message: "Ошибка от Joi или другой библиотеки валидации",
      });
    }
    const result = await userFunctions.login(userData);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/logout", middlewares.authToken, async (req, res, next) => {
  try {
    await userFunctions.logout(req.user);
    res.json({ status: 200, message: "Logged out" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/current", middlewares.authToken, async (req, res, next) => {
  try {
    const result = await userFunctions.showCurrentUser(
      req.headers.authorization
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch(
  "/avatars",
  middlewares.authToken,
  middlewares.upload.single("avatars"),
  async (req, res, next) => {
    try {
      const result = await userFunctions.updateAvatar(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;

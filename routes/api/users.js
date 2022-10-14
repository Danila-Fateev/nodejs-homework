const express = require("express");

const router = express.Router();
const { userJoiSchema } = require("../../models/user");
const userFunctions = require("../../controllers/users");

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

router.get("/login", async (req, res, next) => {
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

module.exports = router;

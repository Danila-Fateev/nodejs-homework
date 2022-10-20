const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Error({ status: "401", message: "Not authorized" });
    }
    try {
      const decodedToken = await jwt.verify(token, SECRET_KEY);
      if (!decodedToken) {
        throw new Error({ status: "401", message: "Not authorized" });
      }
      const userId = decodedToken.id;
      const userFoundById = await User.findById(userId);
      if (!userFoundById || token !== userFoundById.token) {
        throw new Error({ status: "401", message: "Not authorized" });
      }

      req.user = userFoundById;
      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = authToken;

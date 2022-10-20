const express = require("express");

const router = express.Router();
const Joi = require("joi");
const { contactJoiSchema } = require("../../models/contact");

const contactsFunctions = require("../../controllers/contacts");
const middlewares = require("../../middlewares");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsFunctions.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:contactId", middlewares.authToken, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsFunctions.getContactById(contactId);
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", middlewares.authToken, async (req, res, next) => {
  try {
    const value = await contactJoiSchema.validate(req.body);

    const newContact = req.body;
    const user = req.user;
    if (!value) {
      throw new Error({ message: "Invalid contact data" });
    }
    const result = await contactsFunctions.addContact(newContact, user);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:contactId", middlewares.authToken, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await contactsFunctions.removeContact(contactId);
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:contactId", middlewares.authToken, async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsFunctions.updateContact(contactId, req.body);
    return result;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put(
  "/:contactId/favorite",
  middlewares.authToken,
  async (req, res, next) => {
    const { contactId } = req.params;

    try {
      const result = await contactsFunctions.updateStatusContact(
        contactId,
        req.body
      );
      return result;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
